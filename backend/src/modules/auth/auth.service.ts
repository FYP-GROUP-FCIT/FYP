import { Injectable } from '@nestjs/common';
import { User } from './../user/entities/user.entity';
import { AuthHelper } from './auth.helper';
import { Request, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleEnum, UserStatusEnum } from '@lib/types';
import {
  AuthorizeResponseDto,
  LoginRequestDto,
  UserRegisterRequestDto,
} from '@lib/dtos';
import { UpdateAccessDto } from '@lib/dtos/auth/updateAccess';
import { GlobalResponseDto } from '@lib/dtos/common';
import { UpdateStatusDto } from '@lib/dtos/auth/updateStatus';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private authHelper: AuthHelper
  ) {}
  async socialLogin(@Request() req) {
    const { email, firstName, lastName, userName } = req.user;
    const user: User = await this.repository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const newUser: User = this.repository.create({
        email,
        firstName,
        lastName,
        userName,
      });
      await this.repository.save(newUser);
      if (
        newUser.role === UserRoleEnum.MEMBER &&
        newUser.status === UserStatusEnum.INACTIVE
      ) {
        throw new HttpException('User needs approval!', HttpStatus.NOT_FOUND);
      }
      return newUser;
    }
    if (
      !user ||
      (user.role === UserRoleEnum.MEMBER &&
        user.status === UserStatusEnum.DEACTIVATE)
    ) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    if (
      user.role === UserRoleEnum.MEMBER &&
      user.status === UserStatusEnum.INACTIVE
    ) {
      throw new HttpException('User needs approval!', HttpStatus.NOT_FOUND);
    }
    const token = this.authHelper.token(user);
    return new AuthorizeResponseDto(user, token);
  }

  public async registerUser(
    body: UserRegisterRequestDto
  ): Promise<User | never> {
    const { email, password }: UserRegisterRequestDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    let rollUser: User = await this.repository.findOne({
      where: { rollNumber: body.rollNumber },
    });

    if (rollUser) {
      throw new HttpException('User already exit!', HttpStatus.CONFLICT);
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
      throw new HttpException('User already exit!', HttpStatus.CONFLICT);
    }
    user = new User();
    user.email = body.email;
    user.role = UserRoleEnum.MEMBER;
    user.status = UserStatusEnum.INACTIVE;
    user.rollNumber = body.rollNumber;
    user.userName = body.userName;
    const hashedPassword = await this.authHelper.encodePassword(password);
    user.setPassword(hashedPassword);
    const newUser = await this.repository.save(user);
    return newUser;
  }

  public async updateUserAccess(
    updateAccessDto: UpdateAccessDto
  ): Promise<GlobalResponseDto> {
    const user = await this.repository.findOne({
      where: { id: updateAccessDto.userId },
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    user.setRole(updateAccessDto.role);
    await this.repository.save(user);
    let message = '';
    if (updateAccessDto.role === UserRoleEnum.COORDINATOR) {
      message = 'User Role Successfully updated to Coordinator!';
    }
    if (updateAccessDto.role === UserRoleEnum.ADMIN) {
      message = 'User Role Successfully updated to Admin!';
    }
    if (updateAccessDto.role === UserRoleEnum.PRESIDENT) {
      message = 'User Role Successfully updated to Member!';
    }
    return new GlobalResponseDto(message);
  }

  async updateUserStatus(
    updateStatusDto: UpdateStatusDto
  ): Promise<GlobalResponseDto> {
    const user = await this.repository.findOne({
      where: { id: updateStatusDto.userId },
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    user.setStatus(updateStatusDto.status);
    await this.repository.save(user);
    const message =
      updateStatusDto.status === UserStatusEnum.ACTIVE
        ? 'User Successfully activated!'
        : 'User Successfully deactivated!';
    return new GlobalResponseDto(message);
  }

  public async login(
    body: LoginRequestDto
  ): Promise<AuthorizeResponseDto | never> {
    console.log(body);
    const { email, password }: LoginRequestDto = body;
    const user: User | any = await this.repository.findOne({
      where: { email },
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user || (user.role === UserRoleEnum.MEMBER && user.disable === true)) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (
      !user ||
      (user.role === UserRoleEnum.MEMBER &&
        user.status === UserStatusEnum.INACTIVE)
    ) {
      throw new HttpException('User needs Approval', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.authHelper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException('Password Invalid!', HttpStatus.NOT_FOUND);
    }
    delete user.password;
    return new AuthorizeResponseDto(user, this.authHelper.generateToken(user));
  }
}

import { CreateUserDto, UpdateUserDto } from '@lib/dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ConfigEnum,
  IServerConfig,
  IUserParams,
  ServerConfigEnum,
  UserRoleEnum,
  UserStatusEnum,
} from '@lib/types';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from '../auth/auth.helper';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject(AuthHelper)
    private helper: AuthHelper
  ) {}

  async createAdmin() {
    const isAdminExit = await this.userRepository.findOneBy({
      role: UserRoleEnum.ADMIN,
    });
    if (isAdminExit != null) return;
    const adminDetail: IServerConfig[ServerConfigEnum.ADMIN] =
      this.config.get<IServerConfig>(ConfigEnum.SERVER).admin;
    const adminUser: IUserParams = {
      ...adminDetail,
      role: UserRoleEnum.ADMIN,
      status: UserStatusEnum.ACTIVE,
    };
    const admin = new User(adminUser);
    const hashedPassword = await this.helper.encodePassword(
      adminDetail.password
    );
    admin.setPassword(hashedPassword);
    this.userRepository.save(admin);
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        role: Not(UserRoleEnum.ADMIN),
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}

import {Injectable } from '@nestjs/common';
import { User } from './../user/entities/user.entity';
import { AuthHelper } from './auth.helper';
import {
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole, UserStatus } from '@lib/types';
import { AuthorizeResponseDto } from '@lib/dtos';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repository:Repository<User>,private authHelper:AuthHelper){}
  async login(@Request() req){
    const {email,firstName,lastName,userName}=req.user
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
        newUser.role === UserRole.MEMBER &&
        newUser.status === UserStatus.INACTIVE
      ) {
        throw new HttpException('User needs approval!', HttpStatus.NOT_FOUND);
      }
      return newUser;
    }
    if (
      !user ||
      (user.role === UserRole.MEMBER &&
        user.status === UserStatus.DEACTIVATE)
    ) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    if (
      user.role === UserRole.MEMBER &&
      user.status === UserStatus.INACTIVE
    ) {
      throw new HttpException('User needs approval!', HttpStatus.NOT_FOUND);
    }
    const token=this.authHelper.token(user);
    return new AuthorizeResponseDto(user,token);
  }
}
import { UserStatusEnum, UserRoleEnum } from '@lib/types';
import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { MulterFile } from '@nestjs/platform-express';
import { Express } from 'express';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: `User name length must be less than 30`,
  })
  userName: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: `First Name length must be less than 30`,
  })
  firstName: string;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: `Last Name length must be less than 30`,
  })
  lastName: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  @MinLength(7, {
    message: `Password must be at least 7 characters long`,
  })
  password: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @ApiProperty({ type: 'file', required: false })
  @Type(() => UploadedFile)
  file: Express.Multer.File;
}

export class UserRegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, {
    message: 'Last Name length must be less than 30',
  })
  @ApiProperty({ example: 'Smith', description: 'Last Name of user' })
  public readonly userName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.smith@demo.com',
    description: 'Email of the user',
  })
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7, {
    message: 'Password must be at least 7 characters long',
  })
  @ApiProperty({
    example: 'password',
    description: 'Password for user. Must be 7 characters long.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7, {
    message: 'Password must be at least 7 characters long',
  })
  @ApiProperty({
    example: 'password',
    description: 'Password for user. Must be 7 characters long.',
  })
  rollNumber: string;
}

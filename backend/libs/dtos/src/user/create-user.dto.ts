import { UserStatus, IUser, UserRole } from '@lib/types';
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
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ type: 'file', required: false })
  @Type(() => UploadedFile)
  file: Express.Multer.File;
}

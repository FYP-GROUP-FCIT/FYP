import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Express } from 'express';

import { IsEmail, IsString, MaxLength, IsOptional } from 'class-validator';

export class HiringRequestDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: `User name length must be less than 30`,
  })
  userName: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  position: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  rollNumber: string;

  @ApiProperty({ type: 'file', required: false })
  @Type(() => UploadedFile)
  image: Express.Multer.File;
}

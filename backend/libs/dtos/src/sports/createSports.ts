import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Express } from 'express';

import {
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { SportsTypeEnum } from '@lib/types/db/entities/sports';

export class CreateSportsDto {
  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, {
    message: `User name length must be less than 30`,
  })
  sportsName: string;

  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  @IsEnum(SportsTypeEnum)
  sportsType: SportsTypeEnum;

  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  sportsFee: number;

  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  minParticipants: number;

  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  maxParticipants: number;
}

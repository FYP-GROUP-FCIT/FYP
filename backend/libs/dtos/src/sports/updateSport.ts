import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { SportsTypeEnum } from '@lib/types/db/entities/sports';

export class UpdateSportsDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  @MaxLength(30, {
    message: `User name length must be less than 30`,
  })
  sportsName?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsEnum(SportsTypeEnum)
  sportsType?: SportsTypeEnum;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  sportsFee?: number;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  minParticipants?: number;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  maxParticipants?: number;
}

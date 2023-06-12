import { MaterialStatus, MaterialType } from '@lib/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsEnum(MaterialType)
  category: MaterialType;

  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsEnum(MaterialStatus)
  status: MaterialStatus;
}

export class UpdateMaterialDto {
  @ApiProperty({ type: 'string', required: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true })
  @IsOptional()
  @IsEnum(MaterialType)
  category: MaterialType;

  @ApiProperty({ type: 'number', required: true })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: 'string', required: true })
  @IsOptional()
  @IsEnum(MaterialStatus)
  status: MaterialStatus;
}

export class IssueMaterialDto {
  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: 'string', example: 'issued to id', required: true })
  @IsNotEmpty()
  @IsString()
  issueTo: string;

  @ApiProperty({ type: 'string', example: 'issuer to id', required: true })
  @IsNotEmpty()
  @IsString()
  issueBy: string;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsEnum(MaterialStatus)
  status: MaterialStatus;
}

import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { TeamMemberDto } from './team-member-dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UploadedFile } from '@nestjs/common';
import { Sports } from 'src/modules/sports/entities/sports.entity';

export class CreateTeamDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  captainName: string;

  @ApiProperty({ type: 'string', required: true })
  @IsNumberString()
  @Length(11, 14)
  @IsNotEmpty()
  PhoneNumber: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  //   @ApiProperty({ type: [TeamMemberDto], required: true })
  //   @IsArray()
  //   @IsNotEmpty()
  //   @ValidateNested({ each: true })
  //   @Type(() => TeamMemberDto)
  members: TeamMemberDto[];

  @ApiProperty({ type: 'file', required: true })
  @Type(() => UploadedFile)
  paymentImage?: Express.Multer.File;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  sports: string;
}

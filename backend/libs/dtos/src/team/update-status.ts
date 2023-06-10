import { TeamRegistrationStatus } from '@lib/types/db/entities/team';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRegistrationStatusDto {
  @ApiProperty({ type: 'string', required: true })
  @IsEnum(TeamRegistrationStatus)
  @IsNotEmpty()
  status: TeamRegistrationStatus;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  id: string;
}

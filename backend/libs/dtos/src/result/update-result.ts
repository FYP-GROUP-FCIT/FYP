import { TeamRegistrationStatus } from '@lib/types/db/entities/team';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateResultDto {
  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @IsNotEmpty()
  matchNo: number;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  winnerTeamId: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  loserTeamId: string;

  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @IsNotEmpty()
  winnerPoints: number;

  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @IsNotEmpty()
  loserPoints: number;
}

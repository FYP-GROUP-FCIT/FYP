import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsTimeFormat } from './custom-time-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchFixtureDto {
  @ApiProperty({ type: 'string', example: 'BhauKaal', required: true })
  @IsString()
  @IsNotEmpty()
  TeamA: string;

  @ApiProperty({ type: 'string', example: 'Carnage', required: true })
  @IsString()
  @IsNotEmpty()
  TeamB: string;

  @ApiProperty({
    type: 'string',
    description: 'place where match will be held',
    example: 'FCIT Ground A ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  Venue: string;

  @ApiProperty({ type: 'Date', example: '2024-01-01', required: true })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: 'string', example: '05:00', required: true })
  @IsTimeFormat()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ type: 'string', example: 'cricket', required: true })
  @IsString()
  @IsNotEmpty()
  sports: string;
}

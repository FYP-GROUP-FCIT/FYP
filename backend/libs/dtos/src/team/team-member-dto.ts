import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TeamMemberDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  rollNo: string;
}

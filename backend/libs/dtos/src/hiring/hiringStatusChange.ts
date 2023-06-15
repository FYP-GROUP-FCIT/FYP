import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { HiringStatus } from '@lib/types';

export class HiringStatusChangeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;

  // @ApiProperty({ type: String, required: true })
  // @IsNotEmpty()
  // @IsString()
  // email: string;

  @ApiProperty({ required: true, description: 'Approved' })
  @IsNotEmpty()
  @IsEnum(HiringStatus)
  status: HiringStatus;

  // @ApiProperty({ type: String, required: true, description: 'Coordinator' })
  // @IsNotEmpty()
  // @IsString()
  // position: string;
}

import { SWAGGER_API_TAG } from '@lib/constants';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateTeamDto } from '@lib/dtos/team/create-team-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { TeamRegistrationStatus } from '@lib/types/db/entities/team';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GlobalResponseDto } from '@lib/dtos/common';

@ApiTags(SWAGGER_API_TAG.REGISTRATION)
@Controller('registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Get(':id/status')
  async getTeamStatus(
    @Param('id') id: string
  ): Promise<TeamRegistrationStatus> {
    return await this.registrationService.getTeamStatus(id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('paymentImage'))
  @Post()
  async submitTeam(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() paymentImage: Express.Multer.File
  ): Promise<GlobalResponseDto> {
    console.log(createTeamDto);
    return await this.registrationService.EnterTeam(
      createTeamDto,
      paymentImage
    );
  }
}

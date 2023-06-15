import { SWAGGER_API_TAG } from '@lib/constants';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
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
import { UpdateRegistrationStatusDto } from '@lib/dtos';
import { Teams } from './entities/team-entity';

@ApiTags(SWAGGER_API_TAG.REGISTRATION)
@Controller('registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Get('/:id')
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
    return await this.registrationService.EnterTeam(
      createTeamDto,
      paymentImage
    );
  }
  @Put('/status')
  async updateStatus(
    @Body() updateTeamStatusDto: UpdateRegistrationStatusDto
  ): Promise<GlobalResponseDto> {
    return await this.registrationService.updateStatus(updateTeamStatusDto);
  }

  @Get()
  async getTeams(): Promise<Teams[]> {
    return await this.registrationService.getTeams();
  }
}

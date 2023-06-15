import { SWAGGER_API_TAG } from '@lib/constants';
import {
  HiringRequestDto,
  HiringStatusChangeDto,
  ShowHiringDto,
} from '@lib/dtos';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HiringService } from './hiring.service';
import { GlobalResponseDto } from '@lib/dtos/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole, UserRoleEnum } from '@lib/types';
import { Hiring } from './entities/hiring.entity';
import { HiringTable } from './entities/hiringTable.entity';

@ApiTags(SWAGGER_API_TAG.HIRING)
@Controller('hiring')
export class HiringController {
  constructor(private readonly hiringService: HiringService) {}
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post('register')
  async register(
    @Body() body: HiringRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<GlobalResponseDto> {
    return await this.hiringService.register(body, file);
  }

  @Put('change-status')
  async changeStatus(
    @Body() body: HiringStatusChangeDto
  ): Promise<GlobalResponseDto> {
    return await this.hiringService.changeStatus(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @Put('show-hide-hiring')
  async showHideHiring(
    @Body() body: ShowHiringDto
  ): Promise<GlobalResponseDto> {
    return await this.hiringService.showHideHiring(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @Get('show-hiring')
  async showHiring(): Promise<HiringTable[]> {
    return await this.hiringService.showHiring();
  }

  @Get('get-society')
  async SocietyBody(): Promise<Hiring[]> {
    return await this.hiringService.getSocietyBody();
  }

  @Get('get-submissions')
  async getSubmissions(): Promise<Hiring[]> {
    return await this.hiringService.getSubmissions();
  }

  @Get('get-status/:email')
  async getStatus(@Param('email') email: string): Promise<Hiring> {
    return await this.hiringService.getStatus(email);
  }
}

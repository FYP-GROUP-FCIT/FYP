import { SWAGGER_API_TAG } from '@lib/constants';
import { HiringRequestDto, HiringStatusChangeDto } from '@lib/dtos';
import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HiringService } from './hiring.service';
import { GlobalResponseDto } from '@lib/dtos/common';

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
  async chnageStatus(
    @Body() body: HiringStatusChangeDto
  ): Promise<GlobalResponseDto> {
    return await this.hiringService.changeStatus(body);
  }
}

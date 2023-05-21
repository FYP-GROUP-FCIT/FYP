import { SWAGGER_API_TAG } from '@lib/constants';
import { HiringRequestDto } from '@lib/dtos';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags(SWAGGER_API_TAG.HIRING)
@Controller('hiring')
export class HiringController {
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post('register')
  async register(
    @Body() body: HiringRequestDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(body, file);
  }
}

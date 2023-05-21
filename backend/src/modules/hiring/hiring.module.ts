import { Module } from '@nestjs/common';
import { HiringController } from './hiring.controller';
import { HiringService } from './hiring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hiring } from './entities/hiring.entity';
import { User } from '../user/entities/user.entity';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { HiringPhotos } from './entities/hiringPhotos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hiring, User, HiringPhotos])],
  controllers: [HiringController],
  providers: [HiringService, CloudinaryConfigService],
})
export class HiringModule {}

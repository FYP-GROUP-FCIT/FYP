import { Module } from '@nestjs/common';
import { HiringController } from './hiring.controller';
import { HiringService } from './hiring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hiring } from './entities/hiring.entity';
import { User } from '../user/entities/user.entity';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { HiringTable } from './entities/hiringTable.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hiring, User, HiringTable])],
  controllers: [HiringController],
  providers: [HiringService, CloudinaryConfigService, MailService],
})
export class HiringModule {}

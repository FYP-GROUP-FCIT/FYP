import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationController } from './registration.controller';
import { Teams } from './entities/team-entity';
import { TeamMember } from './entities/teamMembers';
import { RegistrationService } from './registration.service';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { Sports } from '../sports/entities/sports.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, TeamMember, Sports])],
  controllers: [RegistrationController],
  providers: [RegistrationService, CloudinaryConfigService, MailService],
})
export class RegistrationModule {}

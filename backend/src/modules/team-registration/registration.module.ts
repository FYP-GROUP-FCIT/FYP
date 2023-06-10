import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationController } from './registration.controller';
import { Registration } from './entities/team-entity';
import { TeamMember } from './entities/teamMembers';
import { RegistrationService } from './registration.service';
import { CloudinaryConfigService } from '@config/cloudinary.config';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, TeamMember])],
  controllers: [RegistrationController],
  providers: [RegistrationService, CloudinaryConfigService],
})
export class RegistrationModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationController } from "./registration.controller";
import { RegistrationEntity } from "./entities/team-entity";
import { TeamMember } from "./entities/teamMembers";
import { RegistrationService } from "./registration.service";






@Module({
    imports: [TypeOrmModule.forFeature([RegistrationEntity, TeamMember])],
    controllers: [RegistrationController],
    providers: [RegistrationService]
})
export class RegistrationModule { }
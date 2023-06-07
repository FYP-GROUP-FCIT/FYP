import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegistrationEntity } from "./entities/team-entity";
import { TeamMember } from "./entities/teamMembers";
import { CreateTeamDto } from "@lib/dtos/team/create-team-dto";

@Injectable()
export class RegistrationService {

    constructor(
        @InjectRepository(RegistrationEntity)
        private readonly registrationRepository: Repository<RegistrationEntity>,
        @InjectRepository(TeamMember)
        private teamMemberRepository: Repository<TeamMember>,
    ) { }

    async getTeamStatus(id: number) {
        const registration = await this.registrationRepository.findOneBy({ id: id });
        if (registration) {
            return registration.status;
        } else {
            throw new NotFoundException('Team not found');
        }
    }


    async EnterTeam(createTeamDto: CreateTeamDto): Promise<void> {
        const { teamname, captainName, PhoneNumber, address, members, paymentimage } = createTeamDto;

        const registration = new RegistrationEntity();
        registration.Teamname = teamname;
        registration.captainName = captainName;
        registration.phoneNumber = PhoneNumber;
        registration.address = address;

        if (paymentimage) {
            registration.image = paymentimage.buffer;
        }

        const savedRegistration = await this.registrationRepository.save(registration);

        const teamMemberPromises = members.map(memberDto => {
            const teamMember = new TeamMember();
            teamMember.name = memberDto.name;
            teamMember.RollNumber = memberDto.rollNo;
            teamMember.team = savedRegistration;
            return this.teamMemberRepository.save(teamMember);
        });

        await Promise.all(teamMemberPromises);
    }


}

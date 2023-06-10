import { TeamRegistrationStatus } from '@lib/types/db/entities/team';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/team-entity';
import { TeamMember } from './entities/teamMembers';
import { CreateTeamDto } from '@lib/dtos/team/create-team-dto';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { GlobalResponseDto } from '@lib/dtos/common';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    @Inject(CloudinaryConfigService)
    private readonly cloudinaryConfigService: CloudinaryConfigService
  ) {}

  async getTeamStatus(id: string): Promise<TeamRegistrationStatus> {
    try {
      const registration = await this.registrationRepository.findOneBy({
        id,
      });
      if (registration) {
        return registration.status;
      } else {
        throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async EnterTeam(
    createTeamDto: CreateTeamDto,
    paymentImage: Express.Multer.File
  ): Promise<GlobalResponseDto> {
    try {
      const { teamName, captainName, PhoneNumber, address, members } =
        createTeamDto;

      const registration = new Registration();
      registration.teamName = teamName;
      registration.captainName = captainName;
      registration.phoneNumber = PhoneNumber;
      registration.address = address;
      if (paymentImage) {
        const result: any = await this.cloudinaryConfigService.uploadImage(
          paymentImage,
          'payments'
        );
        console.log(result);
        const url = result?.url;
        registration.image = url;
      }
      const savedRegistration = await this.registrationRepository.save(
        registration
      );
      console.log(savedRegistration);
      const teamMemberPromises = members.map((memberDto) => {
        const teamMember = new TeamMember();
        teamMember.name = memberDto.name;
        teamMember.rollNumber = memberDto.rollNo;
        teamMember.team = savedRegistration;
        return this.teamMemberRepository.save(teamMember);
      });

      //   await Promise.all(teamMemberPromises);
      return new GlobalResponseDto(
        'Team Registration Request Submitted, wait for confirmation Email!'
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

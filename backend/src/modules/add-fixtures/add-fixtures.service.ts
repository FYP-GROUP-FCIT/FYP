import {
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { CreateMatchFixtureDto } from './DTO/add-fixture-dto';
import { Teams } from '../team-registration/entities/team-entity';
import { Sports } from '../sports/entities/sports.entity';
import { TeamRegistrationStatus } from '@lib/types/db/entities/team';

@Injectable()
export class AddFixturesService {
  constructor(
    @InjectRepository(MatchFixture)
    private readonly matchFixtureRepository: Repository<MatchFixture>,
    @InjectRepository(Teams)
    private readonly registrationRepo: Repository<Teams>,
    @InjectRepository(Sports)
    private readonly sportsRepo: Repository<Sports>
  ) {}

  async createFixture(
    createMatchFixtureDto: CreateMatchFixtureDto
  ): Promise<{ message: string }> {
    try {
      const sports = await this.sportsRepo.findOneBy({
        sportsName: createMatchFixtureDto.sports,
      });
      const matchFixture: Partial<MatchFixture> = {
        teamA: createMatchFixtureDto.TeamA,
        teamB: createMatchFixtureDto.TeamB,
        venue: createMatchFixtureDto.Venue,
        date: createMatchFixtureDto.date,
        time: createMatchFixtureDto.time,
        sport: sports,
      };
      const teamA = await this.registrationRepo.findOneBy({
        teamName: matchFixture.teamA,
      });
      const teamB = await this.registrationRepo.findOneBy({
        teamName: matchFixture.teamB,
      });
      if (!sports || !teamA || !teamB)
        throw new HttpException(
          'Record for teams or sport not found',
          HttpStatus.NOT_FOUND
        );
      if (
        teamA.status === TeamRegistrationStatus.PENDING ||
        teamA.status === TeamRegistrationStatus.REJECTED
      ) {
        throw new HttpException(
          `${teamA.teamName} registration is not approved yet`,
          HttpStatus.BAD_REQUEST
        );
      }

      if (
        teamB.status === TeamRegistrationStatus.PENDING ||
        teamB.status === TeamRegistrationStatus.REJECTED
      ) {
        throw new HttpException(
          `${teamB.teamName} registration is not approved yet`,
          HttpStatus.BAD_REQUEST
        );
      }
      const res = await this.matchFixtureRepository.save(matchFixture);
      if (!res)
        throw new HttpException(
          'Failed to create fixture',
          HttpStatus.BAD_REQUEST
        );
      return { message: 'Fixture Added Successfully!' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

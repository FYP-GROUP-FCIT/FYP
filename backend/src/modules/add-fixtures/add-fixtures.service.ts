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
import { Registration } from '../team-registration/entities/team-entity';
import { Sports } from '../sports/entities/sports.entity';

@Injectable()
export class AddFixturesService {
  constructor(
    @InjectRepository(MatchFixture)
    private readonly matchFixtureRepository: Repository<MatchFixture>,
    @InjectRepository(Registration)
    private readonly registrationRepo: Repository<Registration>,
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
        TeamA: createMatchFixtureDto.TeamA,
        TeamB: createMatchFixtureDto.TeamB,
        Venue: createMatchFixtureDto.Venue,
        date: createMatchFixtureDto.date,
        time: createMatchFixtureDto.time,
        sport: sports,
      };
      const teamA = await this.registrationRepo.findOneBy({
        teamName: matchFixture.TeamA,
      });
      const teamB = await this.registrationRepo.findOneBy({
        teamName: matchFixture.TeamB,
      });

      if (!sports || !teamA || !teamB)
        throw new HttpException(
          'Record for teams or sport not found',
          HttpStatus.NOT_FOUND
        );
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

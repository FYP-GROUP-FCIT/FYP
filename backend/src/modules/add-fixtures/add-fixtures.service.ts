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

@Injectable()
export class AddFixturesService {
  constructor(
    @InjectRepository(MatchFixture)
    private readonly matchFixtureRepository: Repository<MatchFixture>
  ) {}

  async createFixture(
    createMatchFixtureDto: CreateMatchFixtureDto
  ): Promise<{ message: string }> {
    try {
      const matchFixture: Partial<MatchFixture> = {
        TeamA: createMatchFixtureDto.TeamA,
        TeamB: createMatchFixtureDto.TeamB,
        Venue: createMatchFixtureDto.Venue,
        date: createMatchFixtureDto.date,
        time: createMatchFixtureDto.time,
      };
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

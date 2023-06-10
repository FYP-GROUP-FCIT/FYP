import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Result } from './entites/results.entity';
import { UpdateResultDto } from '@lib/dtos';
import { Registration } from '../team-registration/entities/team-entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Registration)
    private registrationRepo: Repository<Registration>,
    @InjectRepository(MatchFixture)
    private fixtureRepository: Repository<MatchFixture>
  ) {}

  async setResult(body: UpdateResultDto): Promise<Result> {
    try {
      const { matchNo, winnerTeamId, loserTeamId, loserPoints, winnerPoints } =
        body;
      const foundFixture = await this.fixtureRepository.findOne({
        where: { matchNo },
        relations: ['sport'],
      });
      if (!foundFixture)
        throw new HttpException(
          'Fixture/Match not found!',
          HttpStatus.NOT_FOUND
        );
      if (foundFixture.result)
        throw new HttpException(
          'Result already added for this match',
          HttpStatus.CONFLICT
        );
      const winnerTeam = await this.registrationRepo.findOneBy({
        id: winnerTeamId,
      });
      const loserTeam = await this.registrationRepo.findOneBy({
        id: loserTeamId,
      });

      if (!winnerTeam || !loserTeam)
        throw new HttpException(
          'Record for teams not found',
          HttpStatus.NOT_FOUND
        );
      const result = new Result();
      result.fixture = foundFixture;
      result.sport = foundFixture.sport;
      result.winnerTeam = winnerTeam;
      result.loserTeam = loserTeam;
      result.winnerPoints = winnerPoints;
      result.loserPoints = loserPoints;
      return await this.resultRepository.save(result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getFixtures(): Promise<MatchFixture[]> {
    return this.fixtureRepository.find({ relations: ['result'] });
  }
}

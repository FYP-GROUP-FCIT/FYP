import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Result } from './entites/results.entity';

@Injectable()
export class ResultsService {

    constructor(
        @InjectRepository(Result)
        private resultRepository: Repository<Result>,
        @InjectRepository(MatchFixture)
        private fixtureRepository: Repository<MatchFixture>,
    ) { }

    async setResult(fixtureId: number, winner: string): Promise<Result> {
        const queryBuilder = this.fixtureRepository
            .createQueryBuilder('fixture')
            .leftJoinAndSelect('fixture.result', 'result')
            .where('fixture.MatchNo = :id', { id: fixtureId })
            .getOne();

        const fixture = await queryBuilder;

        if (!fixture) {
            throw new Error('Invalid fixture ID');
        }

        if (fixture.result) {
            throw new Error('Result already set for this fixture');
        }

        const result = new Result();
        result.winner = winner;
        result.fixture = fixture;

        return this.resultRepository.save(result);
    }

    async getFixtures(): Promise<MatchFixture[]> {
        return this.fixtureRepository.find({ relations: ['result'] });
    }


}

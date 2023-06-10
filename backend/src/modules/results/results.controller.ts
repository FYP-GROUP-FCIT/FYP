import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Result } from './entites/results.entity';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {


    constructor(private readonly resultService: ResultsService) { }

    @Patch(':fixtureId')
    async setResult(
        @Param('fixtureId') fixtureId: number,
        @Body('winner') winner: string,
    ): Promise<Result> {
        return this.resultService.setResult(fixtureId, winner);
    }

    @Get('fixtures')
    async getFixtures(): Promise<MatchFixture[]> {
        return this.resultService.getFixtures();
    }

}

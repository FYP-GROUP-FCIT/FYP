import { SWAGGER_API_TAG } from '@lib/constants';
import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Result } from './entites/results.entity';
import { ResultsService } from './results.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateResultDto } from '@lib/dtos';

@ApiTags(SWAGGER_API_TAG.RESULTS)
@Controller('results')
export class ResultsController {
  constructor(private readonly resultService: ResultsService) {}

  @Put()
  async setResult(@Body() body: UpdateResultDto): Promise<Result> {
    return this.resultService.setResult(body);
  }

  @Get('fixtures')
  async getFixtures(): Promise<MatchFixture[]> {
    return this.resultService.getFixtures();
  }
  @Get()
  async getResults(): Promise<Result[]> {
    return this.resultService.getResults();
  }
}

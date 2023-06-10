import { SWAGGER_API_TAG } from '@lib/constants';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MatchFixtureDto } from './DTO/fixture-dto';
import { FixturesService } from './fixtures.service';
import { ApiTags } from '@nestjs/swagger';
import { MatchFixture } from './entites/fixture-entity';
@ApiTags(SWAGGER_API_TAG.FIXTURES)
@UseGuards()
@Controller('fixtures')
export class FixturesController {
  constructor(private readonly matchFixtureService: FixturesService) {}

  @Get()
  async getFixtures(): Promise<MatchFixture[]> {
    return await this.matchFixtureService.getCurrentAndNextDayFixtures();
  }
}

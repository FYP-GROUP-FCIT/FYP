import { SWAGGER_API_TAG } from '@lib/constants';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MatchFixtureDto } from './DTO/fixture-dto';
import { FixturesService } from './fixtures.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchFixture } from './entites/fixture-entity';
import { UserRole, UserRoleEnum } from '@lib/types';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
@ApiTags(SWAGGER_API_TAG.FIXTURES)
// @UseGuards(JwtAuthGuard, RolesGuard)
// @UserRole(UserRoleEnum.MEMBER)
// @ApiBearerAuth()
@Controller('fixtures')
export class FixturesController {
  constructor(private readonly matchFixtureService: FixturesService) {}

  @Get()
  async getFixtures(): Promise<MatchFixture[]> {
    // console.log();
    return await this.matchFixtureService.getCurrentAndNextDayFixtures();
  }
}

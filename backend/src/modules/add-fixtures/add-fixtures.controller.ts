import { UserRole, UserRoleEnum } from '@lib/types';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateMatchFixtureDto } from './DTO/add-fixture-dto';
import { AddFixturesService } from './add-fixtures.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SWAGGER_API_TAG } from '@lib/constants';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@ApiTags(SWAGGER_API_TAG.ADDFIXTURES)
// @UseGuards(JwtAuthGuard, RolesGuard)
// @UserRole(UserRoleEnum.COORDINATOR)
// @ApiBearerAuth()
@Controller('fixtures/add-fixtures')
export class AddFixturesController {
  constructor(private readonly addFixturesService: AddFixturesService) {}

  @Post()
  async createFixture(
    @Body() createMatchFixtureDto: CreateMatchFixtureDto
  ): Promise<{ message: string }> {
    return await this.addFixturesService.createFixture(createMatchFixtureDto);
  }
}

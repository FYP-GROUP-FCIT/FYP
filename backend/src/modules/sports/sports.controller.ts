import { SWAGGER_API_TAG } from '@lib/constants';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Sports } from './entities/sports.entity';
import { SportsService } from './sports.service';
import { CreateSportsDto } from '@lib/dtos/sports/createSports';
import { UpdateSportsDto } from '@lib/dtos/sports/updateSport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SWAGGER_API_TAG.SPORTS)
@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Post()
  async createSports(@Body() body: CreateSportsDto): Promise<Sports> {
    return await this.sportsService.createSports(body);
  }

  @Get()
  async getSports(): Promise<Sports[]> {
    return await this.sportsService.getSports();
  }

  @Get('/:id')
  async getSportById(@Param('id') id: string): Promise<Sports> {
    return await this.sportsService.getSportById(id);
  }

  @Put('/:id')
  async updateSportById(
    @Param('id') id: string,
    @Body() body: UpdateSportsDto
  ): Promise<Sports> {
    return await this.sportsService.updateSportById(id, body);
  }
}

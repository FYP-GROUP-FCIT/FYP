import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Result } from './entites/results.entity';
import { Teams } from '../team-registration/entities/team-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchFixture, Result, Teams])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}

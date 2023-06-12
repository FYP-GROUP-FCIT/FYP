import { Teams } from 'src/modules/team-registration/entities/team-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { AddFixturesController } from './add-fixtures.controller';
import { AddFixturesService } from './add-fixtures.service';
import { Sports } from '../sports/entities/sports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchFixture, Teams, Sports])],
  controllers: [AddFixturesController],
  providers: [AddFixturesService],
})
export class AddFixturesModule {}

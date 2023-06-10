import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sports } from './entities/sports.entity';
import { MatchFixture } from '../fixtures/entites/fixture-entity';
import { Registration } from '../team-registration/entities/team-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sports, MatchFixture, Registration])],
  controllers: [SportsController],
  providers: [SportsService],
})
export class SportsModule {}

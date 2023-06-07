import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchFixture } from "./entites/fixture-entity";
import { FixturesController } from "./fixtures.controller";
import { FixturesService } from "./fixtures.service";


@Module({
  imports: [TypeOrmModule.forFeature([MatchFixture])],
  controllers: [FixturesController],
  providers: [FixturesService]
})
export class FixturesModule { }

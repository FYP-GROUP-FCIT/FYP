import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchFixture } from "../fixtures/entites/fixture-entity";
import { AddFixturesController } from "./add-fixtures.controller";
import { AddFixturesService } from "./add-fixtures.service";



@Module({
    imports: [TypeOrmModule.forFeature([MatchFixture])],
    controllers: [AddFixturesController],
    providers: [AddFixturesService]
})
export class AddFixturesModule { }

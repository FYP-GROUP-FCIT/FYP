import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchFixture } from "../fixtures/entites/fixture-entity";
import { CreateMatchFixtureDto } from "./DTO/add-fixture-dto";





@Injectable()
export class AddFixturesService {


    constructor(
        @InjectRepository(MatchFixture)
        private readonly matchFixtureRepository: Repository<MatchFixture>,
    ) { }

    async createFixture(createMatchFixtureDto: CreateMatchFixtureDto): Promise<void> {

        if (
            !createMatchFixtureDto.TeamA ||
            !createMatchFixtureDto.TeamB ||
            !createMatchFixtureDto.Venue ||
            !createMatchFixtureDto.date ||
            !createMatchFixtureDto.time
        ) {
            throw new BadRequestException('Missing required fields');
        }


        const matchFixture: MatchFixture = {
            MatchNo: createMatchFixtureDto.MatchNo,
            TeamA: createMatchFixtureDto.TeamA,
            TeamB: createMatchFixtureDto.TeamB,
            Venue: createMatchFixtureDto.Venue,
            date: createMatchFixtureDto.date,
            time: createMatchFixtureDto.time,
        };

        await this.matchFixtureRepository.save(matchFixture);
    }



}
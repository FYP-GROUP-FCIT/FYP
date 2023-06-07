import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { MatchFixture } from "./entites/fixture-entity";



@Injectable()
export class FixturesService {

    constructor(
        @InjectRepository(MatchFixture)
        private readonly matchFixtureRepository: Repository<MatchFixture>,
    ) { }

    async getCurrentAndNextDayFixtures(): Promise<MatchFixture[]> {
        const currentDate = new Date();
        // console.log(currentDate);
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        // console.log(nextDay);

        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        // console.log(startOfDay);
        const endOfNextDay = new Date(nextDay.setHours(23, 59, 59, 999));
        // console.log(endOfNextDay);

        return this.matchFixtureRepository.find({
            where: {
                date: Between(startOfDay, endOfNextDay),
            },
        });
    }

}

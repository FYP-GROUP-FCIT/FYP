import { Controller, Get } from "@nestjs/common";
import { MatchFixtureDto } from "./DTO/fixture-dto";
import { FixturesService } from "./fixtures.service";




@Controller('fixtures')
export class FixturesController {

    constructor(private readonly matchFixtureService: FixturesService) { }

    @Get()
    async getFixtures(): Promise<MatchFixtureDto[]> {
        const fixtures = await this.matchFixtureService.getCurrentAndNextDayFixtures();
        return fixtures.map(fixture => ({
            MatchNo: fixture.MatchNo,
            TeamA: fixture.TeamA,
            TeamB: fixture.TeamB,
            Venue: fixture.Venue,
            date: fixture.date,
            time: fixture.time,
        }));
        //console.log(fixtures);
        //return fixtures;
    }

}


import { Controller, Post, Body } from "@nestjs/common";
import { CreateMatchFixtureDto } from "./DTO/add-fixture-dto";
import { AddFixturesService } from "./add-fixtures.service";



@Controller('fixtures/add-fixtures')
export class AddFixturesController {


    constructor(private readonly addfixturesService: AddFixturesService) { }

    @Post()
    async createFixture(@Body() createMatchFixtureDto: CreateMatchFixtureDto): Promise<{ message: string }> {
        await this.addfixturesService.createFixture(createMatchFixtureDto);
        return { message: 'Fixture created successfully' };
    }

}

import { IsDateString, IsNumber, IsString } from 'class-validator';
import { IsTimeFormat } from './custom-time-dto';

export class CreateMatchFixtureDto {

    @IsNumber()
    MatchNo: number;

    @IsString()
    TeamA: string;

    @IsString()
    TeamB: string;

    @IsString()
    Venue: string;

    @IsDateString()
    date: Date;

    @IsTimeFormat()
    time: string;
}
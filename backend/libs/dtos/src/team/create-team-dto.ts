import { IsArray, IsNumberString, IsString, Length, ValidateNested, } from "class-validator";
import { TeamMemberDto } from "./team-member-dto";
import { Type } from "class-transformer";

export class CreateTeamDto {
    @IsString()
    teamname: string;


    @IsString()
    captainName: string;

    @IsNumberString()
    @Length(11, 11)
    PhoneNumber: string;

    @IsString()
    address: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TeamMemberDto)
    members: TeamMemberDto[];

    paymentimage?: Express.Multer.File;



}
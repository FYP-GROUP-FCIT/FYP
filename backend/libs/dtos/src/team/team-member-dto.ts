import { IsNotEmpty, IsString } from "class-validator";

export class TeamMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    rollNo: string;
}
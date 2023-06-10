import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMaterialDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    issueTo: string;

    @IsNotEmpty()
    @IsString()
    issueBy: string;
}
import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { CreateTeamDto } from "@lib/dtos/team/create-team-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";




@Controller('registration')
export class RegistrationController {

    constructor(private registrationService: RegistrationService,
    ) { }

    @Get(':id/status')
    async getTeamStatus(@Param('id') id: number) {
        const status = await this.registrationService.getTeamStatus(id);
        return { status };
    }

    @Post()
    @UseInterceptors(FileInterceptor('paymentimage'))
    async submitTeam(
        @Body() body: CreateTeamDto,
        @UploadedFile() paymentimage: Express.Multer.File,
    ) {
        const createTeamDto = plainToClass(CreateTeamDto, body);
        createTeamDto.paymentimage = paymentimage;
        const errors = await validate(createTeamDto);
        if (errors.length > 0) {
            throw new BadRequestException('Error while registration');
        }



        try {
            await this.registrationService.EnterTeam(createTeamDto);
            // Optionally, you can return a success message or status code here
            return { message: 'Team registration successful' };
        } catch (error) {
            // Handle the error appropriately
            throw new InternalServerErrorException('Failed to register team');
        }
    }



}

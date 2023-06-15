import { SWAGGER_API_TAG } from '@lib/constants';
import { User } from './../user/entities/user.entity';
import { GoogleOAuthGuard } from './../../guards/google.guards';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import {
  AuthorizeResponseDto,
  LoginRequestDto,
  UserRegisterRequestDto,
} from '@lib/dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GlobalResponseDto } from '@lib/dtos/common';
import { UpdateAccessDto } from '@lib/dtos/auth/updateAccess';
import { UpdateStatusDto } from '@lib/dtos/auth/updateStatus';
@ApiTags(SWAGGER_API_TAG.AUTH)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private repository: Repository<User>
  ) {}
  @UseGuards(GoogleOAuthGuard)
  @Get('social-login')
  socialLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('redirect')
  async googleAuthRedirect(@Request() req) {
    if (!req.user) {
      return 'No user from google';
    }
    return this.authService.socialLogin(req);
  }

  @Post('registerUser')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({
    status: 201,
    description: 'User created!',
    type: User,
  })
  async RegisterUser(@Body() registerDto: UserRegisterRequestDto) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Successfully login!' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found!' })
  async login(
    @Body() loginRequestDto: LoginRequestDto
  ): Promise<AuthorizeResponseDto | never> {
    return await this.authService.login(loginRequestDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('/update-access')
  async approveAccessUser(
    @Body() updateAccessDto: UpdateAccessDto
  ): Promise<GlobalResponseDto> {
    return await this.authService.updateUserAccess(updateAccessDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('/update-status')
  async approveStatusUser(
    @Body() updateStatusDto: UpdateStatusDto
  ): Promise<GlobalResponseDto> {
    return await this.authService.updateUserStatus(updateStatusDto);
  }
}

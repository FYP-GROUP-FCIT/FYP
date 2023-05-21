import { User } from './../user/entities/user.entity';
import { GoogleOAuthGuard } from './../../guards/google.guards';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { LoginRequestDto } from '@lib/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private repository: Repository<User>
  ) {}
  @UseGuards(GoogleOAuthGuard)
  @Get('login')
  login() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('redirect')
  async googleAuthRedirect(@Request() req) {
    if (!req.user) {
      return 'No user from google';
    }
    return this.authService.login(req);
  }
}

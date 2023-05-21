import { GoogleStrategy } from './../../strategies/google.strategy';
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  // PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  JwtModule.register({
    secret: `fypfcit2023fnsmanagemntsystempucit`,
    signOptions: { expiresIn: '24h' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,AuthHelper],
})
export class AuthModule {}

import { GoogleStrategy } from './../../strategies/google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, IJwtConfig } from '@lib/types';
import { JwtStrategy } from 'src/strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:
          process.env.JWT_SECRET ||
          config.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).secret,
        signOptions: {
          expiresIn:
            process.env.JWT_EXPIRES ||
            config.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).expireIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AuthHelper, JwtStrategy],
})
export class AuthModule {}

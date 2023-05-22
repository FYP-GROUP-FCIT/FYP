import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../modules/user/entities/user.entity';
import { AuthHelper } from '../modules/auth/auth.helper';
import { ConfigEnum, IJwtConfig } from '@lib/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ConfigService) config: ConfigService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET ||
        config.get<IJwtConfig>(ConfigEnum.JWT_TOKEN)?.secret,
      ignoreExpiration: true,
    });
  }

  async validate(payload: string): Promise<User | never> {
    return await this.authHelper.validateUser(payload);
  }
}

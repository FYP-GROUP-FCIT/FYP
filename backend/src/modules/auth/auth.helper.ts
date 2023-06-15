import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, IJwtConfig } from '@lib/types';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(ConfigService)
  private readonly configService: ConfigService;
  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  token(user: User): string {
    const payload = { email: user.email, role: user.role, id: user.id };
    return `acsess_token: ${this.jwt.sign(payload)}`;
  }
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<User> {
    const user = await this.repository.findOne({ where: { id: decoded.id } });
    if (user) {
      delete user.password;
      return user;
    }
  }

  public async encodePassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public generateToken(user: User): string {
    return this.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      {
        secret:
          process.env.JWT_SECRET ||
          this.configService.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).secret,
      }
    );
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthHelper {
  constructor(
    private jwtService: JwtService,
  ) {}

  token(user: User) :string{
    const payload = { email: user.email, role: user.role,id:user.id  };
    return `acsess_token: ${this.jwtService.sign(payload)}`
  }
  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }
}
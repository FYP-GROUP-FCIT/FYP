import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(private jwtService: JwtService) {}

  token(user: User): string {
    const payload = { email: user.email, role: user.role, id: user.id };
    return `acsess_token: ${this.jwtService.sign(payload)}`;
  }
  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<User> {
    const user = await this.repository.findOne({ where: { id: decoded.id } });
    if (user) {
      delete user.password;
      return user;
    }
  }
}

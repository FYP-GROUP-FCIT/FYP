import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Hiring } from '../hiring/entities/hiring.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { AuthHelper } from '../auth/auth.helper';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hiring, Inventory])],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService],
})
export class UserModule {}

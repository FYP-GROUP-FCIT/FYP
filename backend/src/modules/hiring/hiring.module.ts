import { Module } from '@nestjs/common';
import { HiringController } from './hiring.controller';
import { HiringService } from './hiring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hiring } from './entities/hiring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hiring])],
  controllers: [HiringController],
  providers: [HiringService],
})
export class HiringModule {}

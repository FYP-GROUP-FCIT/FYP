import { CreateSportsDto } from '@lib/dtos';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Sports } from './entities/sports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSportsDto } from '@lib/dtos/sports/updateSport';

@Injectable()
export class SportsService {
  @InjectRepository(Sports) private readonly sportsRepo: Repository<Sports>;
  public async createSports(createSports: CreateSportsDto): Promise<Sports> {
    try {
      const {
        sportsName,
        minParticipants,
        maxParticipants,
        sportsFee,
        sportsType,
      } = createSports;
      const existingSports = await this.sportsRepo.findOneBy({ sportsName });
      if (existingSports)
        throw new HttpException('Sport already exists!', HttpStatus.CONFLICT);
      const sports = new Sports();
      sports.sportsName = sportsName;
      sports.minParticipants = minParticipants;
      sports.maxParticipants = maxParticipants;
      sports.sportsFee = sportsFee;
      sports.sportsType = sportsType;
      const savedSport = await this.sportsRepo.save(sports);
      delete savedSport.id;
      return savedSport;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async getSports(): Promise<Sports[]> {
    return await this.sportsRepo.find({
      relations: [
        'teams',
        'matches',
        'result',
        'result.winnerTeam',
        'result.loserTeam',
      ],
    });
  }

  public async getSportById(id: string): Promise<Sports> {
    const existingSports = await this.sportsRepo.findOneBy({ id });
    if (!existingSports)
      throw new HttpException('Sport not found!', HttpStatus.NOT_FOUND);
    return existingSports;
  }

  public async updateSportById(
    id: string,
    body: UpdateSportsDto
  ): Promise<Sports> {
    const existingSports = await this.sportsRepo.findOneBy({ id });
    if (!existingSports)
      throw new HttpException('Sport not found!', HttpStatus.NOT_FOUND);
    const updatedSports = Object.assign(existingSports, body);
    await this.sportsRepo.save(updatedSports);
    return updatedSports;
  }
}

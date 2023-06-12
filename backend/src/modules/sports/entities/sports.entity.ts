import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { HiringStatus } from '@lib/types';
import { SportsTypeEnum } from '@lib/types/db/entities/sports';
import { MatchFixture } from 'src/modules/fixtures/entites/fixture-entity';
import { Teams } from 'src/modules/team-registration/entities/team-entity';
import { Result } from 'src/modules/results/entites/results.entity';

@Entity({ name: `sports` })
export class Sports {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: SportsTypeEnum,
  })
  sportsType: SportsTypeEnum;

  @Column({
    length: 100,
    nullable: false,
  })
  sportsName: string;

  @Column({
    nullable: false,
  })
  sportsFee: number;

  @Column({
    nullable: false,
  })
  minParticipants: number;

  @Column({
    nullable: false,
  })
  maxParticipants: number;

  @OneToMany(() => MatchFixture, (fixtures) => fixtures.sport, {
    cascade: true,
  })
  matches: MatchFixture[];

  @OneToMany(() => Teams, (registration) => registration.sport, {
    cascade: true,
  })
  teams: Teams[];

  @OneToMany(() => Result, (result) => result.sport, {
    cascade: true,
  })
  result: Result[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  setSportsName(sportsName: string) {
    this.sportsName = sportsName;
  }

  setSportsFee(sportsFee: number) {
    this.sportsFee = sportsFee;
  }

  setMinParticipants(minParticipants: number) {
    this.minParticipants = minParticipants;
  }

  setMaxParticipants(maxParticipants: number) {
    this.maxParticipants = maxParticipants;
  }

  setSportsType(sportsType: SportsTypeEnum) {
    this.sportsType = sportsType;
  }
}

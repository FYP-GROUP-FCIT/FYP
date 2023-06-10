import { Result } from 'src/modules/results/entites/results.entity';
import { Sports } from 'src/modules/sports/entities/sports.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MatchFixture {
  @PrimaryGeneratedColumn()
  matchNo: number;

  @Column()
  teamA: string;

  @Column()
  teamB: string;

  @Column()
  venue: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @OneToOne(() => Result, (result) => result.fixture, { eager: true })
  result?: Result;

  @ManyToOne(() => Sports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sport: Sports;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

import { MatchFixture } from 'src/modules/fixtures/entites/fixture-entity';
import { Sports } from 'src/modules/sports/entities/sports.entity';
import { Teams } from 'src/modules/team-registration/entities/team-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Teams, { onDelete: 'CASCADE' })
  winnerTeam: Teams;

  @ManyToOne(() => Teams, { onDelete: 'CASCADE' })
  loserTeam: Teams;

  @Column()
  winnerPoints: number;

  @Column()
  loserPoints: number;

  @OneToOne(() => MatchFixture, { onDelete: 'CASCADE' })
  @JoinColumn()
  fixture: MatchFixture;

  @ManyToOne(() => Sports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sport: Sports;
}

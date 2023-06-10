import { MatchFixture } from 'src/modules/fixtures/entites/fixture-entity';
import { Sports } from 'src/modules/sports/entities/sports.entity';
import { Registration } from 'src/modules/team-registration/entities/team-entity';
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

  @ManyToOne(() => Registration, { onDelete: 'CASCADE' })
  winnerTeam: Registration;

  @ManyToOne(() => Registration, { onDelete: 'CASCADE' })
  loserTeam: Registration;

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

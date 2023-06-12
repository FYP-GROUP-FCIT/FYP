import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { TeamMember } from './teamMembers';
import { TeamRegistrationStatus } from '@lib/types/db/entities/team';
import { Sports } from 'src/modules/sports/entities/sports.entity';
import { Result } from 'src/modules/results/entites/results.entity';

@Entity('registration')
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamName: string;

  @Column()
  captainName: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team, {
    cascade: true,
  })
  members: TeamMember[];

  @ManyToOne(() => Sports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sport: Sports;

  @OneToMany(() => Result, (result) => result.winnerTeam, {
    cascade: true,
  })
  result: Result;

  @Column({ default: null })
  image: string;

  @Column({ default: TeamRegistrationStatus.PENDING })
  status: TeamRegistrationStatus;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TeamMember } from './teamMembers';
import { TeamRegistrationStatus } from '@lib/types/db/entities/team';

@Entity('registration')
export class Registration {
  @PrimaryGeneratedColumn()
  readonly id: string;

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

  @Column({ default: null })
  image: string;

  @Column({ default: TeamRegistrationStatus.PENDING })
  status: TeamRegistrationStatus;
}

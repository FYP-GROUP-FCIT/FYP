import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teams } from './team-entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  rollNumber: string;

  @Column()
  name: string;

  @ManyToOne(() => Teams, { onDelete: 'CASCADE' })
  team: Teams;
}

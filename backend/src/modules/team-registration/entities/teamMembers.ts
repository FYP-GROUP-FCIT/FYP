import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Registration } from './team-entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rollNumber: string;

  @Column()
  name: string;

  @ManyToOne(() => Registration, { onDelete: 'CASCADE' })
  team: Registration;
}

import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Hiring } from './hiring.entity';

@Entity({ name: `hiring-photos` })
export class HiringPhotos {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  photos: string;

  @OneToOne(() => Hiring, (hiring) => hiring.hiringPhotos)
  @JoinColumn()
  hiring: Hiring;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { HiringStatus } from '@lib/types';

@Entity({ name: `hiring` })
export class Hiring {
  @PrimaryGeneratedColumn(`uuid`)
  readonly id: string;

  @Column({
    length: 30,
    nullable: false,
  })
  userName: string;

  @Index()
  @Column({
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    length: 30,
    nullable: false,
  })
  position: string;

  @Column({
    length: 30,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    length: 30,
    nullable: false,
  })
  rollNumber: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: HiringStatus.PENDING,
    enum: HiringStatus,
  })
  status: HiringStatus;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  photos: string;
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

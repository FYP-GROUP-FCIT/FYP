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
  ManyToOne,
} from 'typeorm';
import { HiringPhotos } from './hiringPhotos.entity';

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

  @ManyToOne(() => User, (user) => user.hiring, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToOne(() => HiringPhotos, (hiringPhotos) => hiringPhotos.hiring, {
    cascade: true,
  })
  hiringPhotos: HiringPhotos;
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

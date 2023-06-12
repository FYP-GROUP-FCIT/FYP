import { MaterialStatus, MaterialType } from '@lib/types';
import { IsNotEmpty, isString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: MaterialType })
  category: MaterialType;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: MaterialType })
  status: MaterialStatus;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  issueTo: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  issueBy: User;
}

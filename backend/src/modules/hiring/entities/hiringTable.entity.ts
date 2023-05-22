import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `hiring-table` })
export class HiringTable {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  enable: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

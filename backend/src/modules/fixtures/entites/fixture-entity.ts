import { Result } from 'src/modules/results/entites/results.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MatchFixture {
    @PrimaryGeneratedColumn()
    MatchNo: number;

    @Column()
    TeamA: string;

    @Column()
    TeamB: string;

    @Column()
    Venue: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    time: string;

    @OneToOne(() => Result, result => result.fixture)
    result?: Result;

}


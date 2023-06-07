import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}

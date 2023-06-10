import { MatchFixture } from "src/modules/fixtures/entites/fixture-entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";


@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    winner: string;

    @OneToOne(() => MatchFixture)
    @JoinColumn()
    fixture: MatchFixture;
}
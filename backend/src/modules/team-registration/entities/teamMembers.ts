import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistrationEntity } from "./team-entity";

@Entity()
export class TeamMember {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    RollNumber: string;

    @Column()
    name: string;

    @ManyToOne(() => RegistrationEntity, team => team.members)
    team: RegistrationEntity;
}
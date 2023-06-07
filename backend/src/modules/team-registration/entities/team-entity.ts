import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TeamMember } from './teamMembers';

@Entity('registration')
export class RegistrationEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    Teamname: string;

    @Column()
    captainName: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @OneToMany(() => TeamMember, teamMember => teamMember.team)
    members: TeamMember[];

    @Column({ type: 'blob', default: null })
    image: Buffer;

    @Column({ default: 'pending' })
    status: string;
}
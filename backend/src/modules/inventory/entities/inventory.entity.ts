import { IsNotEmpty, isString } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export class Inventory {

    @PrimaryGeneratedColumn()
    readonly id: string;


    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    qunatity: number;

    @Column()
    issueTo: string;

    @Column()
    issueBy: string;



}
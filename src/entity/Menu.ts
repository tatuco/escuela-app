import {EntityBase} from "../core/EntityBase";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Menu extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fruit: string;

    @Column()
    protein: string;

    @Column()
    beginning: string;

    @Column()
    vegetable: string;

    @Column()
    juice: string

    @Column()
    dayId: number;
}
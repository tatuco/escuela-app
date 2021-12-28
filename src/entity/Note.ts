import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Note extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true, type: "text" })
    description: string

    @Column({ nullable: true })
    reminder: Date;

    @Column()
    userId: number;
    @ManyToOne(type => User, user => user.notes)
    @JoinColumn({name: "userId"})
    user: User;
}
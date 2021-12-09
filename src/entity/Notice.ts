import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Notice extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "longtext" })
    description: string

    @Column({nullable: true})
    image: string;

    @Column()
    userId: number;
    @ManyToOne(type => User, user => user.notices)
    @JoinColumn({name: "userId"})
    user: User;
}
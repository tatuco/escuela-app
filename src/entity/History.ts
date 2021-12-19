import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {File} from "./File";

@Entity()
export class History extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    @ManyToOne(type => User, user => user.histories)
    @JoinColumn({name: "userId"})
    user: User;

    @Column()
    fileId: number;
    @ManyToOne(type => File, file => file.histories)
    @JoinColumn({name: "fileId"})
    file: File;
}
import {EntityBase} from "../core/EntityBase";
import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Schedule} from "./Schedule";
import {User} from "./User";
import {Grade} from "./Grade";

@Entity()
@Unique(["name"])
export class Course extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Schedule, schedule => schedule.course)
    schedules: Schedule[];

    @ManyToMany((type) => User, (u) => u.courses)
    teachers?: User[];

    @ManyToMany((type) => Grade, (u) => u.courses)
    grades?: Grade[];
}
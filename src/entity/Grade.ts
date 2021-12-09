import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Schedule} from "./Schedule";
import {User} from "./User";
import {Notice} from "./Notice";
import {Course} from "./Course";

@Entity()
export class Grade extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Schedule, schedule => schedule.grade)
    schedules: Schedule[];

    @OneToMany(type => User, user => user.grade)
    users: User[];

    @ManyToMany((type) => User, (u) => u.grades)
    teachers?: User[];

    @ManyToMany(() => Course, (c) => c.grades, {eager: true, cascade: true})
    @JoinTable({
        name: 'grade_course',
        joinColumn: {name: 'gradeId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'courseId', referencedColumnName: 'id'},
    })
    courses: { id: number }[];
}
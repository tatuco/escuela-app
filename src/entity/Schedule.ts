import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./Course";
import {Grade} from "./Grade";
import {User} from "./User";

@Entity()
export class Schedule extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    courseId: number;
    @ManyToOne(type => Course, course => course.schedules)
    @JoinColumn({name: "courseId"})
    course: Course;

    @Column()
    gradeId: number;
    @ManyToOne(type => Grade, grade => grade.schedules)
    @JoinColumn({name: "gradeId"})
    grade: Grade;

    @Column()
    dayId: number;

    @Column()
    hourId: number;

    @Column({nullable: true})
    userId: number;
    @ManyToOne(type => User, user => user.schedules)
    @JoinColumn({name: "userId"})
    user: User;
}
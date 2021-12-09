import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Grade} from "./Grade";
import {Course} from "./Course";

@Entity()
export class File extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "longtext" })
    description: string

    @Column({nullable: true})
    file: string;

    @Column()
    userId: number;
    @ManyToOne(type => User, user => user.notices)
    @JoinColumn({name: "userId"})
    user: User;

    @Column()
    gradeId: number;
    @ManyToOne(type => Grade, grade => grade.users)
    @JoinColumn({name: "gradeId"})
    grade: Grade;

    @Column()
    courseId: number;
    @ManyToOne(type => Course, course => course.schedules)
    @JoinColumn({name: "courseId"})
    course: Course;
}
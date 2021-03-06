import {EntityBase} from "../core/EntityBase";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Grade} from "./Grade";
import {Course} from "./Course";
import {History} from "./History";

@Entity()
export class File extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
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

    @OneToMany(type => History, history => history.file)
    histories: History[];
}
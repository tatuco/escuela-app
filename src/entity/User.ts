import {
    Entity,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity, PrimaryColumn, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne
} from "typeorm";
import {Length} from "class-validator";
import * as bcrypt from "bcryptjs";
import {Schedule} from "./Schedule";
import {Note} from "./Note";
import { Notice } from "./Notice";
import {Grade} from "./Grade";
import {Course} from "./Course";

export enum Roles {
    TEACHER = "PROFESOR",
    STUDENT = "ESTUDIANTE",
    ADMIN = "ADMINISTRADOR"
}

@Entity()
@Unique(["email"])
export class User extends BaseEntity {

    @Column()
    @PrimaryColumn()
    @Length(1, 25)
    id: string;

    @Column()
    @Length(6, 100)
    password: string;

    @Column({nullable: true})
    @Length(1, 20)
    phone: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default: false})
    deleted: boolean;

    @Column({nullable: true, type: "text"})
    @Length(1, 255)
    token: string;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.STUDENT
    })
    role: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    isTeacher() {
        return this.role === Roles.TEACHER;
    }

    isStudent() {
        return this.role === Roles.STUDENT;
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    @OneToMany(type => Schedule, schedule => schedule.user)
    schedules: Schedule[];

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];

    @Column({nullable: true})
    gradeId: number;
    @ManyToOne(type => Grade, grade => grade.users)
    @JoinColumn({name: "gradeId"})
    grade: Grade;

    @ManyToMany(() => Grade, (g) => g.teachers, {eager: true, cascade: true})
    @JoinTable({
        name: 'user_grade',
        joinColumn: {name: 'userId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'gradeId', referencedColumnName: 'id'},
    })
    grades: Grade[];

    @ManyToMany(() => Course, (c) => c.teachers, {eager: true, cascade: true})
    @JoinTable({
        name: 'user_course',
        joinColumn: {name: 'userId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'courseId', referencedColumnName: 'id'},
    })
    courses: Course[];
}

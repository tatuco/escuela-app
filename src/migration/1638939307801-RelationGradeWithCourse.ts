import {MigrationInterface, QueryRunner} from "typeorm";
import {Grade} from "../entity/Grade";
import {Course} from "../entity/Course";

export class RelationGradeWithCourse1638939307801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
       const grades = await Grade.find({
           where: { deleted: false}
       })

       const courses = await Course.find({
           where: { deleted: false }
       })

       for (const grade of grades) {
           grade.courses = courses.map(course => ({id: course.id}))
           await grade.save();
       }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}

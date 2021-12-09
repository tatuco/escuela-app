import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Course} from "../entity/Course";

export class CreateCourses1636822567228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const courses = [
            { name: "Matematicas" },
            { name: "Ingles" },
            { name: "Religión" },
            { name: "Naturales" },
        ]
        const repository = getRepository(Course);
        await repository.save(courses);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

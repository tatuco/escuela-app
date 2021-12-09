import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Grade} from "../entity/Grade";

export class CreateGrades1636823653225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const grades = [
            { name: "Sexto grado" },
            { name: "Septimo grado" },
            { name: "Octavo grado" },
            { name: "Noveno grado" },
            { name: "Décimo grado" },
            { name: "Once grado" },
        ]
        const repository = getRepository(Grade);
        await repository.save(grades);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

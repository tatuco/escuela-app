import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Note} from "../entity/Note";
import { format } from 'date-fns';

export class CreateNote1636826412670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const notes = [
            {
                title: "Evaluacion Naturales",
                description: "Estudiar todo relacionado con la fotosintesis y las clases de ecosiistemas dependiendo de los estados climaticos",
                reminder: format(new Date(), 'yyyy-MM-dd') + ' 13:30:00',
                userId: 222222222
            },
            {
                title: "Evaluacion Sociales",
                description: null,
                reminder: null,
                userId: 222222222
            },
        ]
        const repository = getRepository(Note);
        await repository.save(notes);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

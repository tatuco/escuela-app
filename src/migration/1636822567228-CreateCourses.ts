import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Course} from "../entity/Course";

export class CreateCourses1636822567228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const coursesString : string = 'Teoría de Conjuntos,Aritmética,Algebra booleana,informática,matemáticas,Tecnogeometría,Humanidades,Lengua Castellana,Idioma Extranjero,Ciencias Naturales y Educación Ambiental,Ciencias Sociales,Educación Artística,Proyecto de vida,Educación Física,Recreación y Deportes,Tecnología e Informática';
        const courses = coursesString.split(',').map(s => {
            return { name: s}
        })

        const repository = getRepository(Course);
        await repository.save(courses);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

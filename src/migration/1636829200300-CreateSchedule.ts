import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Schedule} from "../entity/Schedule";

export class CreateSchedule1636829200300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let items = [];
        for (let grade = 1; grade <= 6; grade++) {
            for (let day = 1; day <= 5; day++) {
                for (let hour = 1; hour <= 8; hour++) {
                    let course = 1
                    if (hour === 3 || hour === 8)
                        course = 2
                    if (hour === 4 || hour === 5)
                        course = 3
                    if (hour === 6 || hour === 7)
                        course = 4

                    const item = {
                        gradeId: grade,
                        dayId: day,
                        hourId: hour,
                        courseId: course,
                        userId: '000000000',
                    }
                    items.push(item)
                }
            }
        }
        const repository = getRepository(Schedule);
        await repository.save(items);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

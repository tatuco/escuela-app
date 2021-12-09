import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {Menu} from "../entity/Menu";

export class CreateMenu1636825705638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const menus = [
            { fruit: "Patilla", protein: "Carne Asada", beginning: "Lentejas", vegetable: "Papa", juice: "Jugo de Naranja", dayId: 1 },
            { fruit: "Banano, Manzana Verde, Fresas", protein: "Pollo Asada", beginning: "Lentejas", vegetable: "Brócoli", juice: "Jugo de Mango", dayId: 2 },
            { fruit: "Banano, Mandarina", protein: "Carne Asada", beginning: "Lentejas", vegetable: "Repollo y Zanahoria", juice: "Jugo de Melon", dayId: 3 },
            { fruit: "Banano, Manzana Verde, Fresas", protein: "Lomo de cerdo", beginning: "Lentejas", vegetable: "Calabacin", juice: "Jugo de Mango", dayId: 4 },
            { fruit: "Banano", protein: "Pollo Asada", beginning: "Lentejas", vegetable: "Verengena", juice: "Jugo de Lulo", dayId: 5 },
        ]
        const repository = getRepository(Menu);
        await repository.save(menus);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Menu_1 = require("../entity/Menu");
class CreateMenu1636825705638 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const menus = [
                { fruit: "Patilla", protein: "Carne Asada", beginning: "Lentejas", vegetable: "Papa", juice: "Jugo de Naranja", dayId: 1 },
                { fruit: "Banano, Manzana Verde, Fresas", protein: "Pollo Asada", beginning: "Lentejas", vegetable: "Brócoli", juice: "Jugo de Mango", dayId: 2 },
                { fruit: "Banano, Mandarina", protein: "Carne Asada", beginning: "Lentejas", vegetable: "Repollo y Zanahoria", juice: "Jugo de Melon", dayId: 3 },
                { fruit: "Banano, Manzana Verde, Fresas", protein: "Lomo de cerdo", beginning: "Lentejas", vegetable: "Calabacin", juice: "Jugo de Mango", dayId: 4 },
                { fruit: "Banano", protein: "Pollo Asada", beginning: "Lentejas", vegetable: "Verengena", juice: "Jugo de Lulo", dayId: 5 },
            ];
            const repository = typeorm_1.getRepository(Menu_1.Menu);
            yield repository.save(menus);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateMenu1636825705638 = CreateMenu1636825705638;
//# sourceMappingURL=1636825705638-CreateMenu.js.map
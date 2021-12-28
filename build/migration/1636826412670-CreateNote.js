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
const Note_1 = require("../entity/Note");
const date_fns_1 = require("date-fns");
class CreateNote1636826412670 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = [
                {
                    title: "Evaluacion Naturales",
                    description: "Estudiar todo relacionado con la fotosintesis y las clases de ecosiistemas dependiendo de los estados climaticos",
                    reminder: date_fns_1.format(new Date(), 'yyyy-MM-dd') + ' 13:30:00',
                    userId: 222222222
                },
                {
                    title: "Evaluacion Sociales",
                    description: null,
                    reminder: null,
                    userId: 222222222
                },
            ];
            const repository = typeorm_1.getRepository(Note_1.Note);
            yield repository.save(notes);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateNote1636826412670 = CreateNote1636826412670;
//# sourceMappingURL=1636826412670-CreateNote.js.map
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
const User_1 = require("../entity/User");
class CreateAdminUser1579202832774 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = [
                { id: "000000000", name: "SysAdmin", lastName: "TEST", password: "123456", email: "sysadmin@app.com", phone: "+573209661604", role: "ADMINISTRADOR" },
                { id: "111111111", name: "Profesor", lastName: "TEST", password: "123456", email: "profesor@app.com", phone: "+573209661604", role: "PROFESOR" },
                { id: "222222222", name: "Estudiante", lastName: "TEST", password: "123456", email: "estudiante@app.com", phone: "+573209661604", role: "ESTUDIANTE" },
            ];
            try {
                for (let i = 0; i < users.length; i++) {
                    let user = new User_1.User();
                    user.id = users[i].id;
                    user.name = users[i].name;
                    user.password = users[i].password;
                    user.email = users[i].email;
                    user.phone = users[i].phone;
                    user.role = users[i].role;
                    user.lastName = users[i].lastName;
                    user.hashPassword();
                    yield user.save();
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateAdminUser1579202832774 = CreateAdminUser1579202832774;
//# sourceMappingURL=1579202832774-CreateAdminUser.js.map
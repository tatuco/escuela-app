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
const ScheduleService_1 = require("../services/ScheduleService");
const Utils_1 = require("../core/Utils");
const Menu_1 = require("../entity/Menu");
const Validator_1 = require("../core/Validator");
class MenuController {
}
exports.MenuController = MenuController;
MenuController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dayId = ScheduleService_1.ScheduleService.dayOfWeek();
        if (req.query.day)
            dayId = req.query.day;
        const menus = yield Menu_1.Menu.find({
            where: { deleted: false, dayId }
        });
        const addDay = (menu) => {
            menu.day = ScheduleService_1.ScheduleService.searchDay(menu.dayId);
            return menu;
        };
        return res.send({
            data: menus.map(addDay)
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
MenuController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        fruit: "type:string|min:1",
        protein: "type:string|min:1",
        beginning: "type:string",
        vegetable: "type:string",
        juice: "type:string"
    };
    try {
        let valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        yield Menu_1.Menu.update(req.params.id, valide.object);
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=MenuController.js.map
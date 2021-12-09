import {Request, Response} from "express";
import {ScheduleService} from "../services/ScheduleService";
import {handleError} from "../core/Utils";
import {Menu} from "../entity/Menu";
import {Validator} from "../core/Validator";

export class MenuController {
    static index = async (req: Request, res: Response) => {
        try {
            let dayId = ScheduleService.dayOfWeek()
            if (req.query.day)
                dayId = req.query.day
            const menus = await Menu.find({
                where: {deleted: false, dayId}
            })
            const addDay = (menu) => {
                menu.day = ScheduleService.searchDay(menu.dayId)
                return menu
            }
            return res.send({
                data: menus.map(addDay)
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            fruit: "type:string|min:1",
            protein:  "type:string|min:1",
            beginning: "type:string",
            vegetable: "type:string",
            juice: "type:string"
        };
        try {
            let valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            await Menu.update(req.params.id, valide.object);
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    }
}
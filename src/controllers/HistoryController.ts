import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {History} from "../entity/History";
import { Roles } from "../entity/User";

export class HistoryController {
    static index = async (req: Request, res: Response) => {
        try {
            let doWhere: any = { deleted: false }
            const authUser = res.locals.jwtPayload
            if (!authUser.role.startsWith(Roles.ADMIN))
                doWhere.userId = authUser.userId;

            const history = await History.find({
                relations: ['user', 'file', 'file.user'],
                where: doWhere
            })
            return res.send({
                data: history
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }
}
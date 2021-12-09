import {Router} from "express";
import UserController from "../controllers/UserController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import {Roles} from "../entity/User";
import {checkUser} from "../middlewares/checkUser";

const router = Router();
router.get("/", [checkJwt, checkRole([Roles.ADMIN, Roles.TEACHER])], UserController.index);
router.get("/:id([0-9]+)",[checkJwt],UserController.get);
router.post("/", UserController.store);
router.put("/:id([0-9]+)",[checkJwt, checkUser],UserController.update);
router.delete("/:id([0-9]+)",[checkJwt, checkRole([Roles.ADMIN])],UserController.destroy);

export default router;

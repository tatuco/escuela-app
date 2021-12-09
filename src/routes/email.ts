import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/recovery", AuthController.send);


export default router;

import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../entity/User";
import ParamController from "../controllers/ParamController";
import { ScheduleController } from "../controllers/ScheduleController";
import {MenuController} from "../controllers/MenuController";
import {GradeController} from "../controllers/GradeController";
import {NoteController} from "../controllers/NoteController";
import { NoticeController } from "../controllers/NoticeController";
import {FileController} from "../controllers/FileController";
import {CourseController} from "../controllers/CourseController";
import {HistoryController} from "../controllers/HistoryController";

const router = Router();

export default router;

router.get("/params", [checkJwt, checkRole([Roles.ADMIN])], ParamController.index);
router.post("/params", [checkJwt, checkRole([Roles.ADMIN])], ParamController.store);
router.put("/params/:id", [checkJwt, checkRole([Roles.ADMIN])], ParamController.update);
router.delete("/params/:id", [checkJwt, checkRole([Roles.ADMIN])], ParamController.destroy);

router.get("/schedules", [checkJwt, checkRole([Roles.ADMIN,Roles.STUDENT])], ScheduleController.index);
router.put("/schedules/:id", [checkJwt, checkRole([Roles.ADMIN,Roles.TEACHER, Roles.STUDENT])], ScheduleController.update);

router.get("/menus", [checkJwt, checkRole([Roles.ADMIN,Roles.STUDENT, Roles.TEACHER])], MenuController.index);
router.put("/menus/:id", [checkJwt, checkRole([Roles.ADMIN, Roles.TEACHER])], MenuController.update);

router.get("/grades", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], GradeController.index);
router.put("/grades/:id", [checkJwt, checkRole([Roles.ADMIN, Roles.TEACHER])], GradeController.update);

router.get("/courses", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], CourseController.index);
router.post("/courses", [checkJwt, checkRole([Roles.ADMIN, Roles.TEACHER])], CourseController.store);
router.put("/courses/:id", [checkJwt, checkRole([Roles.ADMIN,Roles.TEACHER])], CourseController.update);

router.get("/notes", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoteController.index);
router.post("/notes", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoteController.store);
router.put("/notes/:id", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoteController.update);

router.get("/notices", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoticeController.index);
router.post("/notices", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoticeController.store);
router.put("/notices/:id", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], NoticeController.update);
router.delete("/notices/:id", [checkJwt, checkRole([Roles.ADMIN])], NoticeController.destroy);

router.get("/files", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], FileController.index);
router.post("/files", [checkJwt, checkRole([Roles.ADMIN, Roles.TEACHER])], FileController.store);
router.delete("/files/:id", [checkJwt, checkRole([Roles.ADMIN])], FileController.destroy);

router.get("/history", [checkJwt, checkRole([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER])], HistoryController.index);
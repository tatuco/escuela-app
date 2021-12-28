"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const checkJwt_1 = require("../middlewares/checkJwt");
const checkRole_1 = require("../middlewares/checkRole");
const User_1 = require("../entity/User");
const checkUser_1 = require("../middlewares/checkUser");
const router = express_1.Router();
router.get("/", [checkJwt_1.checkJwt, checkRole_1.checkRole([User_1.Roles.ADMIN, User_1.Roles.TEACHER])], UserController_1.default.index);
router.get("/:id([0-9]+)", [checkJwt_1.checkJwt], UserController_1.default.get);
router.post("/", UserController_1.default.store);
router.put("/:id([0-9]+)", [checkJwt_1.checkJwt, checkUser_1.checkUser], UserController_1.default.update);
router.delete("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole([User_1.Roles.ADMIN])], UserController_1.default.destroy);
exports.default = router;
//# sourceMappingURL=user.js.map
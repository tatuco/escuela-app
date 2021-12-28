"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.Router();
router.post("/recovery", AuthController_1.default.send);
exports.default = router;
//# sourceMappingURL=email.js.map
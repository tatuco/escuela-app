import { Router } from "express";
import auth from "./auth";
import user from "./user";
import email from "./email";
import api from "./api";

const routes = Router();
routes.get("/api", (req, res) => {
    return res.send({
       api: "Service",
       version: "1.0.0"
    });
});
routes.use("/api", auth);
routes.use("/api/users", user);
routes.use("/api/email", email);
routes.use("/api", api);



export default routes;

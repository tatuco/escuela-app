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
const checkJwt_1 = require("./middlewares/checkJwt");
require('dotenv').config();
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const http = require('http');
const routes_1 = require("./routes");
const validateRequest_1 = require("./middlewares/validateRequest");
const Parameters_1 = require("./middlewares/Parameters");
const compression = require('compression');
const typeorm_1 = require("typeorm");
const config_1 = require("./config/config");
const File_1 = require("./entity/File");
const History_1 = require("./entity/History");
const obj = config_1.config();
typeorm_1.createConnection(obj)
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new express application instance
    const app = express();
    const server = http.createServer(app);
    // Call midlewares
    app.use(compression());
    app.use(cors());
    app.use(helmet());
    // we are uploading taken photos through json so we need to increase limit
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(validateRequest_1.validateRequest);
    app.use(Parameters_1.Parameters);
    //Set all routes from routes folder
    app.use("/", routes_1.default);
    app.use([checkJwt_1.checkJwt], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if ((_a = req.url.split('/')[3]) === null || _a === void 0 ? void 0 : _a.startsWith('images'))
                return next();
            let nameFile = req.url.split('/')[3].split('?')[0];
            const file = yield File_1.File.findOne({
                where: {
                    file: typeorm_1.Like(`%${nameFile}`)
                }
            });
            if (!file)
                return res.send({
                    message: 'Archivo no encontrado'
                }).status(404);
            const repository = typeorm_1.getRepository(History_1.History);
            yield repository.save({
                userId: res.locals.jwtPayload.userId,
                fileId: file.id
            });
        }
        catch (e) {
            console.log(e);
            return res.send({
                message: 'Error al intentar guardar historial de descarga.'
            }).status(500);
        }
        next();
    }), express.static('public'));
    app.use(errorHandler);
    app.use(function (req, res) {
        return res.status(404).send({
            message: "Recurso " + req.url + " no Encontrado"
        });
    });
    // app.listen(3000, async () => {
    //     console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, 3000);
    // });
    server.listen(process.env.API_PORT, (err, res) => {
        if (err)
            throw err;
        // console.log(`Server socket.io on port \x1b[32m%s\x1b[0m`, 5000);
        console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, process.env.API_PORT);
    });
}))
    .catch(error => {
    console.log(error);
});
function errorHandler(err, req, res, next) {
    return res.status(500).send({
        message: err.type,
        status: err.statusCode
    });
}
//# sourceMappingURL=index.js.map
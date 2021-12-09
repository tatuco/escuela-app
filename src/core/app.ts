import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
const http = require('http');

import {validateRequest} from "../middlewares/validateRequest";
import {Parameters} from "../middlewares/Parameters";
const compression = require('compression');
const {Logger} = require('../middlewares/logger')

function errorHandler(err, req, res, next) {
    return res.status(500).send({
        message: err.type,
        status: err.statusCode
    });
}

const main = () => {
    return new Promise(((resolve, reject) => {
        // Create a new express application instance
        const app = express();
        const server = http.createServer(app);
// Call midlewares
        app.use(compression());
        app.use(cors());
        app.use(helmet());
// we are uploading taken photos through json so we need to increase limit
        app.use(bodyParser.json({limit: "10mb"}));
        app.use(Logger)
        app.use(validateRequest)
        app.use(Parameters)
//Set all routes from routes folder
        app.use(errorHandler)
        app.use(function (req, res) {
            return res.status(404).send({
                message: "Recurso "+req.url+" no Encontrado"
            });
        });
        resolve(server)
    }))
}

module.exports = main

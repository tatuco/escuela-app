require('dotenv').config();
import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
const http = require('http');
import routes from "./routes";
import {validateRequest} from "./middlewares/validateRequest";
import {Parameters} from "./middlewares/Parameters";
const compression = require('compression');
import {createConnection} from "typeorm";
import {config} from "./config/config";
const obj = config();
createConnection(obj)
    .then(async connection => {
        // Create a new express application instance
        const app = express();
        const server = http.createServer(app);
        // Call midlewares
        app.use(compression());
        app.use(cors());
        app.use(helmet());
        // we are uploading taken photos through json so we need to increase limit
        app.use(bodyParser.json({limit: "10mb"}));
        app.use(validateRequest)
        app.use(Parameters)
        //Set all routes from routes folder
        app.use("/", routes);
        app.use(errorHandler)
        app.use(function (req, res) {
            return res.status(404).send({
                message: "Recurso "+req.url+" no Encontrado"
            });
        });
        // app.listen(3000, async () => {
        //     console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, 3000);
        // });
        server.listen(3000,(err, res) => {
            if (err) throw err;
           // console.log(`Server socket.io on port \x1b[32m%s\x1b[0m`, 5000);
            console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, 3000);
        });
    })
    .catch(error => {
        console.log(error)
    });

function errorHandler(err, req, res, next) {
    return res.status(500).send({
        message: err.type,
        status: err.statusCode
    });
}



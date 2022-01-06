import {checkJwt} from "./middlewares/checkJwt";

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
import {createConnection, getConnection, getRepository, Like} from "typeorm";
import {config} from "./config/config";
import {File} from "./entity/File";
import {History} from "./entity/History";
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
        app.use(express.static('public'));
       /* app.use([ checkJwt ], async (req, res, next) => {
            try {
                if (req.url.split('/')[3]?.startsWith('images'))
                    return next();
                let nameFile = req.url.split('/')[3].split('?')[0];
                const file = await File.findOne({
                    where: {
                        file: Like(`%${nameFile}`)
                    }
                })
                if (!file)
                    return res.send({
                        message: 'Archivo no encontrado'
                    }).status(404)
                const repository = getRepository(History);
                await repository.save({
                   userId: res.locals.jwtPayload.userId,
                   fileId: file.id
                });
            } catch (e) {
                console.log(e)
                return res.send({
                    message: 'Error al intentar guardar historial de descarga.'
                }).status(500)
            }
            next()
        }, express.static('public'))*/
        app.use(errorHandler)
        app.use(function (req, res) {
            return res.status(404).send({
                message: "Recurso "+req.url+" no Encontrado"
            });
        });
        await getConnection()
            .query(`UPDATE history SET deleted=true WHERE deleted=false;`);
        await getConnection()
            .query(`UPDATE file SET deleted=true WHERE deleted=false;`);
        // app.listen(3000, async () => {
        //     console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, 3000);
        // });
        server.listen(process.env.PORT,(err, res) => {
            if (err) throw err;
            console.log(`Server ${process.env.NODE_ENV} started on port \x1b[32m%s\x1b[0m`, process.env.PORT);
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



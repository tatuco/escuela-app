import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";


export abstract class BaseController {
    public service;
    constructor(service) {
        this.service = service;
    }


}

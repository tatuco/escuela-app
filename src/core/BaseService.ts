import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {Request, Response} from "express";


export abstract class BaseService {
    public entity;
    public repository;
    constructor() {
        this.repository = getRepository(this.entity);
    }

    async index(req: Request, res: Response) {
        const list = await this.repository.find();
    }

}

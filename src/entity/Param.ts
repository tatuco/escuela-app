import {
    Column,
    Entity
} from "typeorm";
import {EntityBase} from "../core/EntityBase";
import {PrimaryColumn} from "typeorm/index";

export enum Types {
    NUMBER = "number",
    STRING = "string"
}
@Entity()
export class Param extends EntityBase {
    @PrimaryColumn()
    key: string;

    @Column({nullable: false})
    value: string;

    @Column()
    description: string;
}

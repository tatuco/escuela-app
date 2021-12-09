import {BaseEntity, Column, CreateDateColumn, Entity, UpdateDateColumn} from "typeorm";

@Entity("EntityBase")
export class EntityBase extends BaseEntity {
    /* @PrimaryGeneratedColumn()
     id: number;

     @Column()
     code: string;

     @Column()
     name: string;*/

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default: false})
    deleted: boolean;

    static valide = async function (itemId, message = '') {
        const item = await this.findOne(itemId)
        if (!item)
            throw {message: `${message} ${itemId} no existe. `, status: 422}
        return item
    }

}

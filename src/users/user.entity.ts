import { ObjectId } from "mongodb";
import { CommonEntity } from "../entities/common.entity";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('users')
export class UserEntity extends CommonEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    birthDate: Date;

    @Column()
    address: string;
}
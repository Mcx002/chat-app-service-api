import { CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class CommonEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn({
        default: 1
    })
    version: number;
}
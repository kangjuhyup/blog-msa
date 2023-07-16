import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class ArticleEntity {
    @PrimaryColumn('uuid')
    article_uuid : string;

    @Column()
    CIDs : string;

    @ManyToOne(() => UserEntity, (user) => user.articles)
    user : UserEntity;

    constructor(
        _CIDs : string,
        _user : UserEntity,
    ) {
        this.CIDs = _CIDs
        this.user = _user
    } 
}
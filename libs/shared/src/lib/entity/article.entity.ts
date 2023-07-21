import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class ArticleEntity {
    @PrimaryColumn('uuid')
    article_uuid : string;

    @Column()
    cids : string;

    @Column()
    collection_address : string;

    @Column()
    collection_id : number;

    @ManyToOne(() => UserEntity, (user) => user.articles)
    user : UserEntity;

    constructor(
        _cids : string,
        _user : UserEntity,
    ) {
        this.cids = _cids
        this.user = _user
    } 
}
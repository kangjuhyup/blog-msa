import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    uuid : string;

    @Column()
    address : string;

    @Column({nullable:true})
    nick_name? : string;

    @Column({nullable:true})
    profile? : string;

    @Column({nullable:true})
    background? : string;

    @OneToMany(() => ArticleEntity, (article) => article.user)
    articles? : ArticleEntity[]


    constructor(
        _uuid : string,
        _address : string,
        _nick_name? : string,
        _profile? : string,
        _background? : string,
        
    ) {
        this.address = _address;
        this.uuid = _uuid;
        this.nick_name = _nick_name
        this.profile = _profile
        this.background = _background
    } 
} 
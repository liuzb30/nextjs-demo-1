import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import _ from 'lodash'
import md5 from "md5";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    password:string;
    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    constructor(attributes:Partial<User>) {
        Object.assign(this, attributes)
    }

    @BeforeInsert()
    generatePasswordDigest(){
        this.passwordDigest = md5(this.password)
    }

    toJSON(){
        return _.omit(this,['passwordDigest'])
    }
}

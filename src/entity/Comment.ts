import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    content: string;
    @CreateDateColumn('timestamp')
    createdAt: Date;
    @UpdateDateColumn('timestamp')
    updatedAt: Date;
    @ManyToOne(type=>User, user=>user.comments)
    user:User;
    @ManyToOne(type=>Post, post=>post.comments)
    post:Post;
}

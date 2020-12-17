import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    title:string;
    @Column('text')
    content:string;
}

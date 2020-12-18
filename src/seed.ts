import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {User} from "./entity/User";
import {Comment} from "./entity/Comment";

createConnection().then(async connection => {
    const {manager} = connection
    // 创建user
    const user = new User()
    user.username = 'lzb'
    user.passwordDigest= 'xxx'
    await manager.save(user)
    // 创建文章
    const post = new Post({title:'post 1', content:'第一篇文章'})
    post.author = user
    await manager.save(post)
    // 创建评论
    const comment = new Comment()
    comment.content = '我的评论'
    comment.post = post
    comment.user = user
    await manager.save(comment)
    console.log('成功创建数据');
    await connection.close()


}).catch(error => console.log(error));

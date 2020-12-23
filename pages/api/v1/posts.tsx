import {NextApiHandler} from "next";
import {Post} from "../../../src/entity/Post";
import {getDatabaseConnection} from "../../../lib/connection";
import {withSession} from "../../../lib/withSession";

const Posts:NextApiHandler = withSession(async (req,res)=>{
    if(req.method==='POST'){
        const {title,content} = req.body
        const post = new Post({title,content})
        const user = req.session.get('currentUser')
        post.author = user
        const connection = await getDatabaseConnection()
        await connection.manager.save(post)
        res.json(post)
    }
})
export default Posts;
import {NextApiHandler} from "next";
import {Post} from "../../../src/entity/Post";
import {getDatabaseConnection} from "../../../lib/connection";
import {withSession} from "../../../lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
    if (req.method === 'POST') {
        const {title, content} = req.body
        const post = new Post({title, content})
        const user = req.session.get('currentUser')
        if (!user) {
            res.statusCode = 422
            res.json('请先登录')
            return
        }
        post.author = user
        const connection = await getDatabaseConnection()
        await connection.manager.save(post)
        res.json(post)
    }
})
export default Posts;
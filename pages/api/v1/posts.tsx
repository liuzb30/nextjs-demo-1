import {NextApiHandler} from "next";
import {getPosts} from "../../../lib/posts";

const Posts:NextApiHandler = async (req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','application/json');
    const posts = await getPosts()
    res.end(JSON.stringify(posts))
}
export default Posts;
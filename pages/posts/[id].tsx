import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/connection";
import {Post} from "../../src/entity/Post";

type Props = {
    post: Post
}
const PostDetail: NextPage<Props> = (props) => {
    const {post} = props
    return (
        <div>
            <h1>{post?.title}</h1>
            <article dangerouslySetInnerHTML={{__html: post?.content}}></article>
        </div>
    )
}

export default PostDetail
export const getServerSideProps:GetServerSideProps<any, {id:string}> = async (context)=>{
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne('posts', context.params.id)
    return{
        props:{
            post: JSON.parse(JSON.stringify(post))
        }
    }
}
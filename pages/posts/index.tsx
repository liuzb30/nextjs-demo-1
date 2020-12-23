import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {getDatabaseConnection} from "../../lib/connection";

type Props = {
    posts: Post[]
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts} = props
    return (
        <div>
            <h1>
                文章列表
            </h1>
            {
                posts.map(post => <div key={post.id}><Link href={`/posts/${post.id}`}><a>{post.title}</a></Link> </div>)
            }
        </div>
    )
}
export default PostsIndex;
export const getServerSideProps:GetServerSideProps = async () => {
    const connection  = await getDatabaseConnection()
    const posts = await connection.manager.find(Post)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}
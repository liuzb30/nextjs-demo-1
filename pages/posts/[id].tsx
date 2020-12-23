import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/connection";
import {Post} from "../../src/entity/Post";
import marked from "marked";

type Props = {
    post: Post
}
const PostDetail: NextPage<Props> = (props) => {
    const {post} = props
    return (
        <div className='wrapper'>
            <h1>{post?.title}</h1>
            <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post?.content)}}></article>
            <style jsx>{`
            .wrapper {
              max-width: 800px;
              margin: 16px auto;
              padding: 0 16px;
            }
            h1 {
              padding-bottom: 16px;
              border-bottom: 1px solid #666;
            }
           `}</style>
        </div>
    )
}

export default PostDetail
export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne('posts', context.params.id)
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    }
}
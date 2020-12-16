import {GetStaticPropsContext, NextPage} from "next";
import {getPost, getPostIds} from "../../lib/posts";

type Props = {
    post: Post
}
const Post: NextPage<Props> = (props) => {
    const {post} = props
    return (
        <div>
            <h1>{post?.id}</h1>
            <article dangerouslySetInnerHTML={{__html: post?.htmlContent}}></article>
        </div>
    )
}

export default Post
export const getStaticPaths = async () => {
    const ids = await getPostIds()
    return {
        paths: ids.map(id => ({params: {id}})),
        fallback: true // See the "fallback" section below
    };
}
export const getStaticProps = (context: GetStaticPropsContext) => {
    const id = context.params?.id
    let post
    try {
        post = getPost(id as string)
    } catch (e) {
        post = {}
    }
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    }
}
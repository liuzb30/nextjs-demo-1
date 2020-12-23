import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {getDatabaseConnection} from "../../lib/connection";
import * as querystring from "querystring";

type Props = {
    posts: Post[];
    page: number;
    totalPage: number;
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, page, totalPage} = props
    return (
        <div>
            <h1>
                文章列表
            </h1>
            {
                posts.map(post => <div key={post.id}><Link href={`/posts/${post.id}`}><a>{post.title}</a></Link></div>)
            }
            {page > 1 && <Link href={`/?page=${page - 1}`}><a>上一页</a></Link>}
            {page > 1 && page < totalPage && ' | '}
            {page < totalPage && <Link href={`/?page=${page + 1}`}><a>下一页</a></Link>}
        </div>
    )
}
export default PostsIndex;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url.indexOf('?')
    let page = 1
    if(index!==-1){
        const queryStr = querystring.parse(context.req.url.slice(index + 1))
        page = Number(queryStr.page) || 1
    }

    const perPage = 1
    const connection = await getDatabaseConnection()
    const [posts, totalPage] = await connection.manager.findAndCount(Post, {skip: perPage * (page - 1), take: perPage})
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            page,
            totalPage
        }
    }
}
import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {getDatabaseConnection} from "../../lib/connection";
import * as querystring from "querystring";
import {usePager} from "../../hooks/usePager";

type Props = {
    posts: Post[];
    page: number;
    totalPage: number;
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, page, totalPage} = props
    const {pager} = usePager({page, totalPage})
    return (
        <div className='posts'>
            <h1>
                文章列表
            </h1>
            {
                posts.map(post => <div className='onePost' key={post.id}><Link
                    href={`/posts/${post.id}`}><a>{post.title}</a></Link></div>)
            }
            {pager}
            <style jsx>{`
            .posts {
              max-width: 800px;
              margin: 0 auto;
              padding: 16px;
            }
            .onePost {
              border-bottom: 1px solid #ddd;
              padding: 8px 0;
                  > a {
                      border-bottom: none;
                      color: #000;
                      &:hover {
                          color: #00adb5;
                      }
                  }
              }
            `}</style>
        </div>
    )
}
export default PostsIndex;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url.indexOf('?')
    let page = 1
    if (index !== -1) {
        const queryStr = querystring.parse(context.req.url.slice(index + 1))
        page = Number(queryStr.page) || 1
    }

    const perPage = 10
    const connection = await getDatabaseConnection()
    const [posts, totalCount] = await connection.manager.findAndCount(Post, {skip: perPage * (page - 1), take: perPage})

    const totalPage = Math.ceil(totalCount/perPage)
    console.log(totalPage)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            page,
            totalPage
        }
    }
}
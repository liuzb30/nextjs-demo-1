import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {getDatabaseConnection} from "../../lib/connection";
import * as querystring from "querystring";
import {usePager} from "../../hooks/usePager";
import {withSession} from "../../lib/withSession";

type User = {
    id: string;
}
type Props = {
    posts: Post[];
    page: number;
    totalPage: number;
    totalCount: number;
    currentUser: User | null;
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, page, totalPage, totalCount, currentUser} = props
    const {pager} = usePager({page, totalPage})
    return (
        <div className='posts'>
            <header>
                <h1>文章列表 {totalCount}</h1>
                {currentUser && (
                    <Link href="/posts/new">
                        <a>新增文章</a>
                    </Link>
                )}
            </header>
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
                .posts > header {
                  display: flex;
                  align-items: center;
                }
                .posts > header > h1 {
                  margin: 0;
                  margin-right: auto;
                }
            `}</style>
        </div>
    )
}
export default PostsIndex;
export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    const index = context.req.url.indexOf('?')
    let page = 1
    if (index !== -1) {
        const queryStr = querystring.parse(context.req.url.slice(index + 1))
        page = Number(queryStr.page) || 1
    }

    const perPage = 10
    const connection = await getDatabaseConnection()
    const [posts, totalCount] = await connection.manager.findAndCount(Post, {skip: perPage * (page - 1), take: perPage})
    const totalPage = Math.ceil(totalCount / perPage)
    // @ts-ignore
    const currentUser = context.req.session.get('currentUser') || null
    console.log(totalPage)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            page,
            totalPage,
            totalCount,
            currentUser
        }
    }
})
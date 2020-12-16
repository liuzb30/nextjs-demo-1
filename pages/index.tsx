import {usePosts} from "../hooks/usePosts";
import {getPosts} from "../lib/posts";
import {NextPage} from "next";

type Props = {
    posts: Post[]
}
const Home: NextPage<Props> = (props) => {
    const {posts} = props
    return (
        <div>
            <h1>
                文章列表
            </h1>
            {
                posts.map(post => <div key={post.id}>{post.id}</div>)
            }
        </div>
    )
}
export default Home;
export const getStaticProps = async () => {
    const posts = await getPosts()
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}
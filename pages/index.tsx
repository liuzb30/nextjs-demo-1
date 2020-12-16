
import {usePosts} from "../hooks/usePosts";

export default function Home() {
    const {isLoading,isEmpty,posts} = usePosts()
    return (
        <div>
            <h1>
                文章列表
            </h1>
            {
                isLoading ? <div>加载中</div> :
                    isEmpty ? <div>没有文章</div> :
                        posts.map(post => <div key={post.id}>{post.id}</div>)
            }
        </div>
    )
}

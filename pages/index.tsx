import {NextPage} from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <>
            <div className='cover'>
                <img src='/logo.png'/>
                <h1>刘圳槟的个人博客</h1>
                <p>我是一个爱学习的人</p>
                <p><Link href='/posts'><a>文章列表</a></Link></p>
            </div>
            <style jsx>{`
              .cover{
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                img{
                  width: 120px;
                  height: 120px;
                  border-radius: 50%;
                }
              }
            `}</style>
        </>
    )
}

export default Home
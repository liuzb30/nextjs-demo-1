import {getPosts} from "../lib/posts";
import {GetServerSidePropsContext, NextPage} from "next";
import uaParser from 'ua-parser-js'

type Props = {
    browser: {
        name:string;
        version:string;
        major:string;
    }
}
const Home: NextPage<Props> = (props) => {
    const {browser} = props
    return (
        <div>
            <h1>
                当前浏览器是：{browser.name}
            </h1>
        </div>
    )
}
export default Home;
export const getServerSideProps = (context:GetServerSidePropsContext)=>{
    const ua = context.req.headers['user-agent']
    const browser = new uaParser(ua).getBrowser()
    return{
        props:{
            browser
        }
    }
}
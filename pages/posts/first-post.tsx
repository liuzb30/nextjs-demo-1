import Link from "next/link";
import Head from "next/head";
export default function FirstPost(){
    console.log(111)
    return(
        <>
            <Head>
                <title>第一篇文章</title>
            </Head>
            <div>hello</div>
            <Link href='/'><a >返回首页</a></Link>
        </>
    )
}
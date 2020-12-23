import 'styles/globals.scss'
import 'github-markdown-css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>next js</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp

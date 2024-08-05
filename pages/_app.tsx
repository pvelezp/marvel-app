import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'
import { FavoriteProvider } from '../context/favorite-provider'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoriteProvider>
      <Layout>
        <Head>
          <title>React Marvel App</title>
          <meta name="description" content="Marvel application in React JS" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </FavoriteProvider>
  )
}
export default MyApp

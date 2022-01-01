import Head from 'next/head'
import { BaseLayout } from 'layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="white">
      <Head>
        <title>MMS Frontend - Next (Dev)</title>
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  )
}

export default App

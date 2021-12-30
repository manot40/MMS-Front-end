import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import { Layout } from 'components';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App

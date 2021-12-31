import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import { BaseLayout } from 'layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  )
}

export default App

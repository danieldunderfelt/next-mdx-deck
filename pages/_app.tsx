import { ThemeProvider } from 'styled-components'
import { siteConfig } from '../site.config.js'
import Header from '../components/Header'
import MDXProvider from '../components/MDXProvider'
import { AnimatePresence } from 'framer-motion'
import { CurrentSlideProvider } from '../context/CurrentSlideContext'
import { ModeProvider } from '../context/ModeContext'
import TransitionPage from '../layouts/TransitionPage'
import GlobalStyle from '../components/GlobalStyle'
import Head from 'next/head'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CurrentSlideProvider>
        <ModeProvider>
          <MDXProvider>
            <AnimatePresence exitBeforeEnter>
              <TransitionPage>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
                  />
                  <title>
                    {siteConfig.name} - {siteConfig.title}
                  </title>
                  <link rel="icon" href="/favicon.ico" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                  />
                </Head>
                <Header
                  name={siteConfig.name}
                  title={siteConfig.title}
                  date={siteConfig.date}
                  url={siteConfig.author.url}
                />
                <GlobalStyle />
                <Component {...pageProps} />
              </TransitionPage>
            </AnimatePresence>
          </MDXProvider>
        </ModeProvider>
      </CurrentSlideProvider>
    </ThemeProvider>
  )
}

export default App

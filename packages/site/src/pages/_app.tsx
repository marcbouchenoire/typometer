import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import Head from "next/head"
import { Footer } from "../components/layout/Footer"
import { Header } from "../components/layout/Header"
import "../styles/main.css"

/**
 * A custom `App` component, used to initialize pages.
 *
 * @param props - A set of props.
 * @param props.Component - The active page component.
 * @param props.pageProps - The initial props preloaded for the page.
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Head>
        <title>Typometer</title>
        <meta content="Typometer" name="title" />
        <meta content="Marc Bouchenoire" name="author" />
        <meta content="initial-scale=1, viewport-fit=cover" name="viewport" />
        <meta content="Measure text asynchronously." name="description" />
        <meta content="website" property="og:type" />
        <meta
          content="https://typometer.marcbouchenoire.com"
          property="og:url"
        />
        <meta content="Typometer" property="og:title" />
        <meta
          content="Measure text asynchronously."
          property="og:description"
        />
        <meta
          content="https://typometer.marcbouchenoire.com/meta.png"
          property="og:image"
        />
        <meta
          content="https://typometer.marcbouchenoire.com"
          property="twitter:url"
        />
        <meta content="@marcbouchenoire" property="twitter:creator" />
        <meta content="Typometer" property="twitter:title" />
        <meta
          content="Measure text asynchronously."
          property="twitter:description"
        />
        <meta
          content="https://typometer.marcbouchenoire.com/meta.png"
          property="twitter:image"
        />
        <link href="/favicon.png" rel="icon" sizes="any" type="image/png" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta content="#0bd" name="theme-color" />
      </Head>
      <div className="overflow-hidden absolute top-0 w-full h-72 pointer-events-none md:h-80 lg:h-96">
        <div className="relative h-full content">
          <div className="absolute left-[-100%] w-[300%] h-full opacity-30 md:left-[-150%] md:w-[400%] aura z-negative" />
        </div>
      </div>
      <Header className="content" />
      <Component {...pageProps} />
      <Footer className="content pb-0-safe" />
    </ThemeProvider>
  )
}

export default App

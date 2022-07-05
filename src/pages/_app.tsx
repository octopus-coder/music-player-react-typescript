import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lofi Music Player React</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

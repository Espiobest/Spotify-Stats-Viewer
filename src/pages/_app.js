import Head from 'next/head';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Spotify Stats</title>
        {/* Global meta description */}
        <meta name="description" content="An app that displays your Spotify Listening Activity" />
        {/* Global favicon */}
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

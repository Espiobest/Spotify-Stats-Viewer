import Head from 'next/head'
import Login from "../pages/Login";

export default function Home() {
  // const code = null; 
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <Head>
          <title>Spotify Stats</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="keywords" content="spotify, stats, web development, next, react"></meta>
          <meta name="description" content="A website to view your spotify stats."></meta>
          <meta charSet="utf-8"></meta>
        </Head>
        <h1>Welcome to Next xd</h1>
        {<Login />}
      </div>
    </div>
  );
}

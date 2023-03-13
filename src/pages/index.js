import React from 'react'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>HelloFaizan - Software Enthusiast</title>
        {/* favicon */}
        <link rel="icon" href="/faizan.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#171717" />
        <meta
          name="keywords"
          content="HelloFaizan, Faizan Blog, HelloFaizan blog, CuriousFaizan, web developer, github, typescript, nextjs"
        />
        <meta name="description" content="HelloFaizan - Send message to HelloFaizan" />
        <meta name="author" content="Hello Faizan" />
        <meta property="og:title" content="Drop a message to HelloFaizan" />
        <meta
          property="og:description"
          content="HelloFaizan is a liberal person who loves to share his knowledge with others."
        />
        <meta
          property="og:image"
          content="/dc.png"
        />
        <link rel="apple-touch-icon" href="/faizan.png" />
      </Head>
      <div>Documentation will be created soon</div>
    </>
  )
}

export default Home
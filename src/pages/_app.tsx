// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fymo Tools</title>
        <meta name="description" content="Your one-stop destination for free, fast, and easy-to-use online tools for tax, health, writing, SEO, image, and daily utilities." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Fymo Tools - Free Online Utilities" />
        <meta property="og:description" content="Access a wide range of free online tools for various needs including tax, health, writing, SEO, image, and daily utilities." />
        <meta property="og:image" content="https://www.fymotools.com/logo.png" /> {/* Replace with actual logo URL */}
        <meta property="og:url" content="https://www.fymotools.com/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fymo Tools - Free Online Utilities" />
        <meta name="twitter:description" content="Access a wide range of free online tools for various needs including tax, health, writing, SEO, image, and daily utilities." />
        <meta name="twitter:image" content="https://www.fymotools.com/logo.png" /> {/* Replace with actual logo URL */}
        {/* Google AdSense (Placeholder) */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script> */}
        {/* Google Analytics (Placeholder) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_TRACKING_ID');
          `,
        }} /> */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

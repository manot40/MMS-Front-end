import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='application-name' content='MMS App' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='MMS App' />
          <meta name='description' content='Best MMS App Front End' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />

          <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
              
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://mrasm.vercel.com' />
          <meta name='twitter:title' content='MMS App' />
          <meta name='twitter:description' content='MMS App Front End' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='MMS App' />
          <meta property='og:description' content='MMS App Front End' />
          <meta property='og:site_name' content='MMS App' />
          <meta property='og:url' content='https://mrasm.vercel.app' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

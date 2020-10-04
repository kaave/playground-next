import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';

import * as configs from '@utils/configs';

class ModifiedDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="format-detection" content="email=no,telephone=no,address=no" />
          <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" href="/icon-192x192.png" />
          {configs.robots ? <meta name="robots" content={configs.robots} /> : null}
          <script src="https://platform.twitter.com/widgets.js" defer />
          {configs.googleAnalytics ? (
            <>
              <script src={`https://www.googletagmanager.com/gtag/js?id=${configs.googleAnalytics}`} async />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${configs.googleAnalytics}', { page_path: window.location.pathname });
              `,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          {configs.polyfills ? (
            <script src={`https://polyfill.io/v3/polyfill.min.js?features=${configs.polyfills}&flags=gated`} />
          ) : null}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ModifiedDocument;

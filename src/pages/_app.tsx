import React, { useEffect, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Router from 'next/router';
import type { AppProps } from 'next/app';

import { pageView, timing } from '@utils/gtag';
import { crawlerAccess } from '@utils/crawlers';
import * as configs from '@utils/configs';

import '@styles/index.scss';
import Head from 'next/head';

if (configs.googleAnalytics) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Router.events.on('routeChangeComplete', (url: string) => pageView(url));
}

const App = ({ Component, pageProps, router }: AppProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ie = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('trident');

    if (ie) {
      document.body.classList.add('-ie');
    }
  }, []);

  const visible = crawlerAccess;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <SwitchTransition>
        <CSSTransition key={router.asPath} nodeRef={nodeRef} timeout={300} classNames="page-transition">
          <div ref={nodeRef} className="wrapper" hidden={visible || undefined}>
            <Component {...pageProps} />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default App;

export function reportWebVitals(metrics: {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  if (!configs.production) console.table(metrics);

  const { name, value } = metrics;
  timing(name, name === 'CLS' ? value * 1000 : value);
}

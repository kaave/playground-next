import React from 'react';
import NextHead from 'next/head';

import * as configs from '@utils/configs';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  card?: 'summary' | 'summary_large_image';
  twitterAccount?: string;
  canonical?: boolean;
  children?: HTMLMetaElement[];
};

export const Head = ({
  title = configs.title,
  description = configs.description,
  image = configs.ogp,
  url = configs.baseUrl,
  type = 'website',
  card = 'summary',
  twitterAccount = configs.authorTwitter,
  canonical = configs.production,
  children,
}: Props) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical ? <link key="canonical" rel="canonical" href={url} /> : null}

    {/* Google */}
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    {image ? <meta itemProp="image" content={image} /> : null}

    {/* facebook */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image ? <meta property="og:image" content={image} /> : null}
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />

    {/* Twitter */}
    <meta name="twitter:title" content={title} />
    {twitterAccount ? <meta name="twitter:site" content={twitterAccount} /> : null}
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content={card} />
    {image ? <meta name="twitter:image" content={image} /> : null}
    {children}
  </NextHead>
);

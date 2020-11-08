import { Article } from '@contexts/common/domains/valueObjects/article';
import Link from 'next/link';
import React from 'react';

import { ArticleList } from '../../monos/ArticleList';

type Props = {
  articles: readonly Article[];
  count: number;
};

export const ArticlesTemplate = ({ articles, count }: Props) => (
  <main id="main" className="main" role="main">
    <Link href="/">
      <a>to Root</a>
    </Link>
    count: {count}
    <ArticleList articles={articles} />
  </main>
);

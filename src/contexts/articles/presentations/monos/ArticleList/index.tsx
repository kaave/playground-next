import React from 'react';

import type { Article } from '@contexts/common/domains/valueObjects/article';

type Props = {
  articles: readonly Article[];
};

export const ArticleList = ({ articles }: Props) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.createdAt.toString()}>
          <a href="#">{article.title}</a>
        </li>
      ))}
    </ul>
  );
};

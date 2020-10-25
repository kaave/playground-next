import React from 'react';

import type { Tag } from '@contexts/common/domains/valueObjects/tag';

type Props = {
  tags: readonly Tag[];
};

export const TagList = ({ tags }: Props) => {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>
          <a href="#">{tag}</a>
        </li>
      ))}
    </ul>
  );
};

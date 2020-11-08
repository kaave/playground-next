import { Tag } from '@contexts/common/domains/valueObjects/tag';
import Link from 'next/link';
import React from 'react';

import { TagList } from '../../monos/TagList';

type Props = {
  tags: readonly Tag[];
};

export const RootTemplate = ({ tags }: Props) => {
  return (
    <main id="main" className="main" role="main">
      <Link href="/articles">
        <a>to Articles</a>
      </Link>
      <TagList tags={tags} />
    </main>
  );
};

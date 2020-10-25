import { Tag } from '@contexts/common/domains/valueObjects/tag';
import React from 'react';

import { TagList } from '../../monos/TagList';

type Props = {
  tags: readonly Tag[];
};

export const RootTemplate = ({ tags }: Props) => {
  console.log('hello', tags);

  return (
    <main id="main" className="main" role="main">
      <TagList tags={tags} />
    </main>
  );
};

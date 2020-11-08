import React from 'react';
import type { ComponentProps } from 'react';

import { ArticlesPage } from '@contexts/articles';

type Props = ComponentProps<typeof ArticlesPage>;

// eslint-disable-next-line react/jsx-props-no-spreading
const IndexPage = (props: Props) => <ArticlesPage {...props} />;

export default IndexPage;

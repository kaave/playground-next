import React, { ComponentProps } from 'react';
import type { GetStaticProps } from 'next';

import { RootPage } from '@contexts/root';

type Props = ComponentProps<typeof RootPage>;

const IndexPage = ({ message }: Props) => <RootPage message={message} />;

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => new Promise((resolve) => resolve({ props: {} }));

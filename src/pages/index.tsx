import React from 'react';
import type { GetStaticProps } from 'next';

import { RootTemplate } from '@components/templates/Root';

type Props = {
  message: string;
};

const IndexPage = ({ message }: Props) => <RootTemplate message={message} />;

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () =>
  new Promise((resolve) => resolve({ props: { message: '' } }));

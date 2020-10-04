import React from 'react';
import clsx from 'clsx';

import { Layout } from '@components/templates/layouts/Default';
import styles from './index.module.scss';

type Props = {
  message: string;
};

export const RootTemplate = ({ message }: Props) => (
  <Layout>
    <section className={clsx(styles.section, '-contents')}>
      <div className={styles.inner}>Hello, {message}</div>
    </section>
  </Layout>
);

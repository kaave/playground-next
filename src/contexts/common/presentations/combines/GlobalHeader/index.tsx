import { Heading } from '@common/presentations/monos/primitives/Heading';
import React from 'react';

import styles from './index.module.scss';

export const GlobalHeader = () => (
  <header id="header" className={styles.root}>
    <div className={styles.bg} role="presentation" />
    <div className={styles.inner}>
      <Heading level={1}>Header</Heading>
    </div>
  </header>
);

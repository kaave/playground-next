import React from 'react';

import styles from './index.module.scss';

export const GlobalFooter = () => (
  <footer className={styles.root}>
    <div className={styles.bg} role="presentation" />
    <div className={styles.inner}>Footer</div>
  </footer>
);

import React, { useCallback } from 'react';

import styles from './index.module.scss';
// const styles = { header: '' }

type Props = {
  message: string;
  onClick?: (message: string) => void;
};

export const Example = ({ message, onClick }: Props) => {
  const handleClick = useCallback(() => onClick?.(message), [message, onClick]);

  return (
    <section>
      <h1 className={styles.header}>Test Component</h1>
      <button type="button" onClick={handleClick}>
        {message}
      </button>
    </section>
  );
};

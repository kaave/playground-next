import React, { useMemo } from 'react';
import type { ReactNode } from 'react';

import * as configs from '@utils/configs';
import { Head } from '@components/functions/primitives/Head';
import { ErrorBoundary } from '@components/functions/utils/ErrorBoundary';
import { formatString } from '@utils/formatString';
import { GlobalFooter } from '@components/composed/GlobalFooter';
import { GlobalHeader } from '@components/composed/GlobalHeader';
import styles from './Default.module.scss';

type Props = {
  appendTitles?: string[];
  description?: string;
  descriptionArgv?: string;
  path?: string;
  children?: ReactNode;
};

export const Layout = ({
  appendTitles = [],
  description: rawDescription = configs.description,
  descriptionArgv,
  path,
  children,
}: Props) => {
  const title = useMemo(() => [...appendTitles, configs.title].join(' | '), [appendTitles]);
  const description = useMemo(
    () => (descriptionArgv ? formatString(configs.descriptionTemplate, descriptionArgv) : rawDescription),
    [descriptionArgv, rawDescription],
  );

  return (
    <ErrorBoundary>
      <Head title={title} description={description} url={configs.baseUrl + (path ?? '')} />
      <div className={styles.Inner}>
        <GlobalHeader />
        <div id="main" className={styles.Main} role="main">
          {children}
        </div>
        <GlobalFooter />
      </div>
    </ErrorBoundary>
  );
};

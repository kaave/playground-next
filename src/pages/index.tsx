import React from 'react';
import type { ComponentProps } from 'react';
import type { GetStaticProps } from 'next';
import { isOk, unwrapOk } from '@kaave/result';

import { RootPage } from '@contexts/root';
import { findAllTagsFactory } from '@contexts/common/externals/repositories/findAllTags';
import { findAllTagsFromApi } from '@contexts/common/externals/drivers/findAllTags/api';
import { loadAllTagsUsecaseFactory } from '@contexts/common/applications/usecases/Tag/loadAllTags';

type Props = ComponentProps<typeof RootPage>;

// @TODO うーん context/index.tsx との責務がブレてるな

// eslint-disable-next-line react/jsx-props-no-spreading
const IndexPage = (props: Props) => <RootPage {...props} />;

export default IndexPage;

const repository = findAllTagsFactory(findAllTagsFromApi);
const usecase = loadAllTagsUsecaseFactory(repository);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await usecase();
  return isOk(result) ? { props: { tags: unwrapOk(result) } } : { props: {} };
};

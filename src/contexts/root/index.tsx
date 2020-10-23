import React from 'react';

type Props = {
  message?: string;
};

export const RootPage = ({ message = 'Hello, world!' }: Props) => <div>{message}</div>;

import React, { Component } from 'react';
import type { ErrorInfo } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
type State = {
  error: boolean;
};

function ErrorComponent() {
  return <h1>Something went wrong.</h1>;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { error: false };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const {
      props: { children },
      state: { error },
    } = this;

    return error ? <ErrorComponent /> : children;
  }
}

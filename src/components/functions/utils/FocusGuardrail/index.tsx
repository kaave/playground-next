/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

import { useFocusedOnOutside } from '@components/hooks/useFocusedOnOutside';

type Props = {
  children: ReactNode;
  onFocusOutside?: () => void;
};

export const FocusGuardrail = ({ onFocusOutside, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleFocusedOnOutside = useCallback(() => onFocusOutside?.(), [onFocusOutside]);

  useFocusedOnOutside(ref, handleFocusedOnOutside, { active: !!onFocusOutside });

  return (
    <div ref={ref}>
      <span className="-sr-only" tabIndex={0} role="presentation" onFocus={handleFocusedOnOutside} />
      {children}
      <span className="-sr-only" tabIndex={0} role="presentation" onFocus={handleFocusedOnOutside} />
    </div>
  );
};

import { useCallback, useEffect } from 'react';
import type { RefObject } from 'react';

export function useFocusedOnOutside(
  root: RefObject<HTMLElement>,
  callback: (focusedObject: HTMLElement) => void,
  { active = true }: { active?: boolean } = {},
) {
  const handleFocus = useCallback(
    ({ target }: FocusEvent) => {
      if (!(target instanceof HTMLElement) || root.current?.contains(target)) return;
      callback(target);
    },
    [root, callback],
  );

  useEffect(() => {
    if (!active) return;
    window.addEventListener('focus', handleFocus, true);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('focus', handleFocus, true);
  }, [handleFocus, active]);
}

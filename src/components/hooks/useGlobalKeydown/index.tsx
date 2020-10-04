import { useEffect } from 'react';

export function useGlobalKeydown(callback?: (key: string) => void) {
  useEffect(() => {
    if (!callback) return;

    const args = ['keydown', (e: KeyboardEvent) => callback(e.key), true] as const;
    window.addEventListener(...args);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener(...args);
  }, [callback]);
}

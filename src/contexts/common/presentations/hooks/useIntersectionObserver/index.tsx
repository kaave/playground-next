import { useEffect, useCallback, useRef } from 'react';
import type { RefObject } from 'react';

type Callback = (value: IntersectionObserverEntry, index: number, array: IntersectionObserverEntry[]) => void;

export function useIntersectionObserver(
  target: RefObject<HTMLElement | SVGElement>,
  callback: Callback = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  options: IntersectionObserverInit = {},
) {
  const observerRef = useRef<IntersectionObserver>();

  const unobserve = useCallback(() => {
    if (!observerRef.current || !target.current) return;
    observerRef.current.unobserve(target.current);
  }, [observerRef, target]);

  useEffect(() => {
    if (!target.current) return;
    const element = target.current;
    observerRef.current = new IntersectionObserver((entries) => entries.forEach(callback), { ...options });
    observerRef.current.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => observerRef.current?.unobserve(element);
  }, [target, callback, options, observerRef]);

  return { unobserve };
}

import { createElement, forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type Props = { level: 1 | 2 | 3 | 4 | 5 | 6 } & HTMLAttributes<HTMLHeadingElement>;

export const Heading = forwardRef(({ level, children, ...rest }: Props, ref) =>
  createElement(`h${level}`, { ref, ...rest }, children),
);

import React from 'react';

type Props = {
  width?: string | number;
  height?: string | number;
};

export const Wantedly = ({ width, height }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 700 700">
    <title>Wantedly</title>
    <path d="M0 108.6h100l150 362.1L300 350 200 108.6h100l50 120.7 50-120.7h100L400 350l50 120.7 150-362.1h100L500 591.4H400l-50-120.7-50 120.7H200z" />
  </svg>
);

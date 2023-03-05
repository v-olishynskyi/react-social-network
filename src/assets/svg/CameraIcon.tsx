import * as React from 'react';
import { SVGProps } from 'react';

export const CameraIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width={800}
    height={800}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    {...props}>
    <g stroke='currentColor' strokeWidth={2}>
      <path d='M16 16V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z' />
      <path strokeLinejoin='round' d='m20 7-4 3v4l4 3V7z' />
    </g>
  </svg>
);

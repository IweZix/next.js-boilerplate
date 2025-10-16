import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 34 35"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.347458" y="4.45406" width="5" height="42" transform="rotate(-45 0.347458 4.45406)" />
    <rect x="30.0459" y="0.918526" width="5" height="42" transform="rotate(45 30.0459 0.918526)" />
  </svg>
);

export default CloseIcon;

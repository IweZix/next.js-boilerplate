import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const BurgerIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg {...props} width={size} height={size} fill={color} width="48" height="32" viewBox="0 0 48 32"  xmlns="http://www.w3.org/2000/svg">
  <rect y="14" width="48" height="4" rx="2" />
  <rect width="48" height="4" rx="2" />
  <rect y="28" width="48" height="4" rx="2" />
  </svg>
);

export default BurgerIcon;

import React from 'react';

export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'vertical' | 'horizontal';
}

const sizeMap = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  direction = 'vertical',
}) => {
  const style: React.CSSProperties =
    direction === 'vertical'
      ? { height: sizeMap[size], width: '100%' }
      : { width: sizeMap[size], height: '100%' };

  return <div style={style} aria-hidden="true" />;
};

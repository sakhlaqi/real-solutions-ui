import React from 'react';
import './SkeletonLoader.css';

export interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  animation = 'pulse',
}) => {
  const getStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    if (width) {
      styles.width = typeof width === 'number' ? `${width}px` : width;
    }
    
    if (height) {
      styles.height = typeof height === 'number' ? `${height}px` : height;
    }
    
    return styles;
  };

  const classes = [
    'skeleton',
    `skeleton-${variant}`,
    `skeleton-${animation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={classes} style={getStyles()} />
  ));

  return <>{skeletons}</>;
};

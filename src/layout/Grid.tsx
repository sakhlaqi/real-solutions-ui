import React from 'react';
import './Grid.css';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap = '1rem',
  alignItems,
  justifyItems,
  className = '',
}) => {
  const style: React.CSSProperties = {
    gap,
    alignItems,
    justifyItems,
  };

  if (typeof columns === 'number') {
    style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

  const responsiveClasses = typeof columns === 'object'
    ? Object.entries(columns)
        .map(([breakpoint, cols]) => `grid-cols-${breakpoint}-${cols}`)
        .join(' ')
    : '';

  return (
    <div className={`grid ${responsiveClasses} ${className}`} style={style}>
      {children}
    </div>
  );
};

export interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  rowSpan?: number;
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = '',
}) => {
  const style: React.CSSProperties = {};

  if (typeof colSpan === 'number') {
    style.gridColumn = `span ${colSpan}`;
  }
  style.gridRow = `span ${rowSpan}`;

  const responsiveClasses = typeof colSpan === 'object'
    ? Object.entries(colSpan)
        .map(([breakpoint, span]) => `col-span-${breakpoint}-${span}`)
        .join(' ')
    : '';

  return (
    <div className={`grid-item ${responsiveClasses} ${className}`} style={style}>
      {children}
    </div>
  );
};

import React from 'react';
import './Masonry.css';

export interface MasonryProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number;
  className?: string;
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  spacing = 16,
  className = '',
}) => {
  const getColumnsStyle = (): React.CSSProperties => {
    if (typeof columns === 'number') {
      return {
        columnCount: columns,
        columnGap: `${spacing}px`,
      };
    }

    // Responsive columns
    return {
      '--columns-xs': columns.xs || 1,
      '--columns-sm': columns.sm || 2,
      '--columns-md': columns.md || 3,
      '--columns-lg': columns.lg || 4,
      '--columns-xl': columns.xl || 5,
      columnGap: `${spacing}px`,
    } as React.CSSProperties;
  };

  const isResponsive = typeof columns !== 'number';

  return (
    <div
      className={`masonry ${isResponsive ? 'responsive' : ''} ${className}`}
      style={getColumnsStyle()}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="masonry-item"
          style={{ marginBottom: `${spacing}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

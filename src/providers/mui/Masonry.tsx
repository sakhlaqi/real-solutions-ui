/**
 * MUI Masonry Adapter
 */

import React from 'react';
import MuiMasonry from '@mui/lab/Masonry';

export interface MasonryProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number;
  className?: string;
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  spacing = 2,
  className = '',
}) => {
  return (
    <MuiMasonry
      columns={columns}
      spacing={spacing}
      className={className}
    >
      {React.Children.toArray(children).map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </MuiMasonry>
  );
};

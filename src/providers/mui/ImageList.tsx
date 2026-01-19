import React from 'react';
import MUIImageList from '@mui/material/ImageList';
import MUIImageListItem from '@mui/material/ImageListItem';
import MUIImageListItemBar from '@mui/material/ImageListItemBar';
import type { ImageListProps as MUIImageListProps } from '@mui/material/ImageList';

export interface ImageListItem {
  src: string;
  alt?: string;
  title?: string;
  rows?: number;
  cols?: number;
}

export interface ImageListProps extends Omit<MUIImageListProps, 'children'> {
  items: ImageListItem[];
  cols?: number;
  gap?: number;
  variant?: 'masonry' | 'quilted' | 'standard' | 'woven';
  rowHeight?: number | 'auto';
  className?: string;
  onItemClick?: (item: ImageListItem, index: number) => void;
}

export const ImageList: React.FC<ImageListProps> = ({
  items,
  cols = 3,
  gap = 8,
  variant = 'standard',
  rowHeight = 200,
  className,
  onItemClick,
  ...rest
}) => {
  return (
    <MUIImageList
      cols={cols}
      gap={gap}
      variant={variant}
      rowHeight={rowHeight}
      className={className}
      {...rest}
    >
      {items.map((item, index) => (
        <MUIImageListItem
          key={index}
          cols={item.cols || 1}
          rows={item.rows || 1}
          onClick={() => onItemClick?.(item, index)}
          sx={{ cursor: onItemClick ? 'pointer' : 'default' }}
        >
          <img
            src={item.src}
            alt={item.alt || item.title || `Image ${index + 1}`}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {item.title && (
            <MUIImageListItemBar
              title={item.title}
              position="bottom"
            />
          )}
        </MUIImageListItem>
      ))}
    </MUIImageList>
  );
};

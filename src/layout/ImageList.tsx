import React from 'react';
import './ImageList.css';

export interface ImageListItem {
  src: string;
  alt?: string;
  title?: string;
  rows?: number;
  cols?: number;
}

export interface ImageListProps {
  items: ImageListItem[];
  cols?: number;
  gap?: number;
  variant?: 'standard' | 'quilted' | 'woven' | 'masonry';
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
  className = '',
  onItemClick,
}) => {
  const getGridStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      gap: `${gap}px`,
    };

    if (variant === 'masonry') {
      return {
        ...baseStyle,
        columnCount: cols,
        columnGap: `${gap}px`,
      };
    }

    return {
      ...baseStyle,
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      ...(rowHeight !== 'auto' && { gridAutoRows: `${rowHeight}px` }),
    };
  };

  const getItemStyle = (item: ImageListItem): React.CSSProperties => {
    if (variant === 'standard' || variant === 'woven') {
      return {};
    }

    if (variant === 'quilted') {
      return {
        gridRowEnd: `span ${item.rows || 1}`,
        gridColumnEnd: `span ${item.cols || 1}`,
      };
    }

    if (variant === 'masonry') {
      return {
        marginBottom: `${gap}px`,
        breakInside: 'avoid',
      };
    }

    return {};
  };

  return (
    <div
      className={`image-list variant-${variant} ${className}`}
      style={getGridStyle()}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`image-list-item ${onItemClick ? 'clickable' : ''}`}
          style={getItemStyle(item)}
          onClick={() => onItemClick?.(item, index)}
        >
          <img
            src={item.src}
            alt={item.alt || item.title || `Image ${index + 1}`}
            loading="lazy"
            className="image-list-img"
          />
          {item.title && (
            <div className="image-list-title-bar">
              <span className="image-list-title">{item.title}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

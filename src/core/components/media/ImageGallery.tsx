import React, { useState } from 'react';

export interface ImageGalleryProps {
  images: Array<{
    id: string | number;
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  onImageClick?: (index: number) => void;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 'md',
  onImageClick,
  className = '',
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string | number>>(new Set());

  const handleImageLoad = (id: string | number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className={`image-gallery columns-${columns} gap-${gap} ${className}`}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className="image-gallery-item"
          onClick={() => onImageClick?.(index)}
        >
          <div className={`image-gallery-image-wrapper ${loadedImages.has(image.id) ? 'loaded' : ''}`}>
            <img
              src={image.src}
              alt={image.alt}
              className="image-gallery-image"
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
            />
            {!loadedImages.has(image.id) && (
              <div className="image-gallery-skeleton" />
            )}
          </div>
          {image.caption && (
            <p className="image-gallery-caption">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
};

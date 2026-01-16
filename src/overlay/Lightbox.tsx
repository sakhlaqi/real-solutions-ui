import React, { useEffect, useState } from 'react';
import { Portal } from '../utility/Portal';
import './Lightbox.css';

export interface LightboxProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  showThumbnails?: boolean;
  className?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  showThumbnails = true,
  className = '',
}) => {
  const [index, setIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case 'ArrowLeft':
            handlePrev();
            break;
          case 'ArrowRight':
            handleNext();
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, index]);

  const handlePrev = () => {
    const newIndex = index > 0 ? index - 1 : images.length - 1;
    setIndex(newIndex);
    onNavigate?.(newIndex);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const newIndex = index < images.length - 1 ? index + 1 : 0;
    setIndex(newIndex);
    onNavigate?.(newIndex);
    setIsZoomed(false);
  };

  const handleThumbnailClick = (idx: number) => {
    setIndex(idx);
    onNavigate?.(idx);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!isOpen) return null;

  const currentImage = images[index];

  return (
    <Portal>
      <div className={`lightbox ${className}`}>
        <div className="lightbox-backdrop" onClick={onClose} />

        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              className="lightbox-nav lightbox-nav-prev"
              onClick={handlePrev}
              aria-label="Previous image"
              type="button"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M20 24L12 16L20 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="lightbox-nav lightbox-nav-next"
              onClick={handleNext}
              aria-label="Next image"
              type="button"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M12 24L20 16L12 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        <div className="lightbox-content">
          <div
            className={`lightbox-image-wrapper ${isZoomed ? 'zoomed' : ''}`}
            onClick={toggleZoom}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="lightbox-image"
            />
          </div>

          {currentImage.caption && (
            <div className="lightbox-caption">{currentImage.caption}</div>
          )}

          <div className="lightbox-counter">
            {index + 1} / {images.length}
          </div>
        </div>

        {showThumbnails && images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`lightbox-thumbnail ${idx === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(idx)}
                type="button"
              >
                <img src={img.src} alt={img.alt} />
              </button>
            ))}
          </div>
        )}
      </div>
    </Portal>
  );
};

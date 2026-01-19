/**
 * Adapter Lightbox Component
 * 
 * Uses MUI Dialog implementation.
 * Internal implementation is deprecated.
 */

import React, { useState, useEffect } from 'react';
import { Dialog } from '../providers/mui';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

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

/**
 * Adaptive Lightbox Component
 * 
 * @example
 * ```tsx
 * <Lightbox
 *   images={images}
 *   currentIndex={0}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  showThumbnails = true,
  className,
}) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

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
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, index]);

  const handlePrev = () => {
    const newIndex = index > 0 ? index - 1 : images.length - 1;
    setIndex(newIndex);
    onNavigate?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = index < images.length - 1 ? index + 1 : 0;
    setIndex(newIndex);
    onNavigate?.(newIndex);
  };

  const handleThumbnailClick = (idx: number) => {
    setIndex(idx);
    onNavigate?.(idx);
  };

  const currentImage = images[index];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white', padding: 16 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          >
            ✕
          </IconButton>

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: 8, top: '50%', color: 'white' }}
              >
                ◀
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: 8, top: '50%', color: 'white' }}
              >
                ▶
              </IconButton>
            </>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
            {currentImage.caption && (
              <Box sx={{ marginTop: 2, fontSize: 14 }}>{currentImage.caption}</Box>
            )}
            <Box sx={{ marginTop: 1, fontSize: 12, opacity: 0.7 }}>
              {index + 1} / {images.length}
            </Box>
          </Box>

          {showThumbnails && images.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                marginTop: 2,
                overflowX: 'auto',
                justifyContent: 'center',
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => handleThumbnailClick(idx)}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: idx === index ? '2px solid white' : '2px solid transparent',
                    borderRadius: 4,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </div>
    </Dialog>
  );
};

Lightbox.displayName = 'AdapterLightbox';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { Button } from './Button';

/**
 * Lightbox component for viewing images in a modal with navigation.
 * 
 * **Now using MUI Dialog implementation** for better modal management and accessibility.
 * 
 * ## Features
 * - Full-screen image viewing
 * - Navigation between images
 * - Keyboard shortcuts (Arrow keys, Escape)
 * - Thumbnail navigation
 * - Image captions
 */
const meta: Meta<typeof Lightbox> = {
  title: 'Overlay/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    alt: 'Mountain landscape',
    caption: 'Beautiful mountain landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
    alt: 'Ocean view',
    caption: 'Peaceful ocean view at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    alt: 'Nature',
    caption: 'Green forest with sunlight',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    alt: 'Forest path',
    caption: 'Misty forest path',
  },
];

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setIsOpen(true)} variant="contained">
          Open Lightbox
        </Button>

        <Lightbox
          images={sampleImages}
          currentIndex={currentIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={setCurrentIndex}
        />
      </div>
    );
  },
};

export const WithoutThumbnails: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setIsOpen(true)} variant="contained">
          Open Lightbox (No Thumbnails)
        </Button>

        <Lightbox
          images={sampleImages}
          currentIndex={currentIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={setCurrentIndex}
          showThumbnails={false}
        />
      </div>
    );
  },
};

export const SingleImage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setIsOpen(true)} variant="contained">
          View Single Image
        </Button>

        <Lightbox
          images={[sampleImages[0]]}
          currentIndex={0}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

export const ImageGallery: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };

    return (
      <div style={{ padding: '24px' }}>
        <h3>Click any image to view in lightbox</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {sampleImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => openLightbox(index)}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
            />
          ))}
        </div>

        <Lightbox
          images={sampleImages}
          currentIndex={currentIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={setCurrentIndex}
        />
      </div>
    );
  },
};

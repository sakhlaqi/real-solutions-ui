import React, { useState } from 'react';
import './Carousel.css';

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % children.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, children.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-inner">
        <div
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="carousel-slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {showDots && (
        <div className="carousel-dots">
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

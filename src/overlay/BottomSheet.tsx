import React, { useEffect, useRef, useState } from 'react';
import { Portal } from '../utility/Portal';
import './BottomSheet.css';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[]; // Percentages: [50, 100]
  defaultSnap?: number;
  showHandle?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [50, 100],
  defaultSnap = 0,
  showHandle = true,
  closeOnBackdrop = true,
  className = '',
}) => {
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setCurrentY(clientY);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;
    setCurrentY(clientY);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaY = currentY - startY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.1;

    if (deltaY > threshold) {
      // Swipe down
      if (currentSnap > 0) {
        setCurrentSnap(currentSnap - 1);
      } else {
        onClose();
      }
    } else if (deltaY < -threshold) {
      // Swipe up
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(currentSnap + 1);
      }
    }

    setStartY(0);
    setCurrentY(0);
  };

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const height = snapPoints[currentSnap];
  const dragOffset = isDragging ? Math.max(0, currentY - startY) : 0;

  return (
    <Portal>
      <div className="bottomsheet-backdrop" onClick={handleBackdropClick}>
        <div
          ref={sheetRef}
          className={`bottomsheet ${className}`}
          style={{
            height: `${height}%`,
            transform: `translateY(${dragOffset}px)`,
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {showHandle && (
            <div
              className="bottomsheet-handle-container"
              onMouseDown={(e) => handleDragStart(e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientY)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
              onTouchEnd={handleDragEnd}
            >
              <div className="bottomsheet-handle" />
            </div>
          )}

          {title && (
            <div className="bottomsheet-header">
              <h2 className="bottomsheet-title">{title}</h2>
            </div>
          )}

          <div className="bottomsheet-content">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

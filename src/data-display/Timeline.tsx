import React from 'react';
import './Timeline.css';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export interface TimelineProps {
  items: TimelineItem[];
  position?: 'left' | 'right' | 'alternate';
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  position = 'right',
  className = '',
}) => {
  return (
    <div className={`timeline position-${position} ${className}`}>
      {items.map((item, index) => {
        const isAlternate = position === 'alternate';
        const isLeft = position === 'left' || (isAlternate && index % 2 === 0);

        return (
          <div
            key={item.id}
            className={`timeline-item ${isLeft ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              {item.time && <div className="timeline-time">{item.time}</div>}
              <div className="timeline-card">
                <div className="timeline-title">{item.title}</div>
                {item.description && (
                  <div className="timeline-description">{item.description}</div>
                )}
              </div>
            </div>

            <div className={`timeline-separator ${item.color || 'primary'}`}>
              <div className="timeline-dot">
                {item.icon || <div className="timeline-dot-inner" />}
              </div>
              {index < items.length - 1 && <div className="timeline-connector" />}
            </div>

            <div className="timeline-opposite">
              {isAlternate && item.time && (
                <div className="timeline-time">{item.time}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

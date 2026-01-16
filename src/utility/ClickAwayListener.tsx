import React, { useRef, useEffect } from 'react';

export interface ClickAwayListenerProps {
  children: React.ReactElement;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
}

export const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
  mouseEvent = 'onClick',
  touchEvent = 'onTouchEnd',
}) => {
  const nodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (!nodeRef.current || nodeRef.current.contains(event.target as Node)) {
        return;
      }
      onClickAway(event);
    };

    if (mouseEvent) {
      const eventType = mouseEvent === 'onClick' ? 'click' : mouseEvent.toLowerCase().replace('on', '');
      document.addEventListener(eventType, handleClickAway as EventListener);
    }

    if (touchEvent) {
      const eventType = touchEvent.toLowerCase().replace('on', '');
      document.addEventListener(eventType, handleClickAway as EventListener, { passive: true });
    }

    return () => {
      if (mouseEvent) {
        const eventType = mouseEvent === 'onClick' ? 'click' : mouseEvent.toLowerCase().replace('on', '');
        document.removeEventListener(eventType, handleClickAway as EventListener);
      }
      if (touchEvent) {
        const eventType = touchEvent.toLowerCase().replace('on', '');
        document.removeEventListener(eventType, handleClickAway as EventListener);
      }
    };
  }, [onClickAway, mouseEvent, touchEvent]);

  return React.cloneElement(children, { ref: nodeRef });
};

import React from 'react';
import ReactDOM from 'react-dom';
import './Backdrop.css';

export interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  opacity?: number;
  blur?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  opacity = 0.5,
  blur = false,
  className = '',
  children,
}) => {
  if (!open) return null;

  const style: React.CSSProperties = {
    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    backdropFilter: blur ? 'blur(4px)' : 'none',
  };

  const backdropContent = (
    <div
      className={`backdrop ${className}`}
      style={style}
      onClick={onClick}
      role="presentation"
    >
      {children}
    </div>
  );

  return ReactDOM.createPortal(backdropContent, document.body);
};

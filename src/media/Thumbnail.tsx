import React from 'react';
import './Thumbnail.css';

export interface ThumbnailProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'rounded' | 'circle';
  bordered?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  alt,
  size = 'md',
  shape = 'rounded',
  bordered = false,
  onClick,
  className = '',
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div
      className={`thumbnail ${size} ${shape} ${bordered ? 'bordered' : ''} ${
        onClick ? 'clickable' : ''
      } ${className}`}
      onClick={onClick}
    >
      {!loaded && !error && <div className="thumbnail-skeleton" />}
      {error ? (
        <div className="thumbnail-error">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`thumbnail-image ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

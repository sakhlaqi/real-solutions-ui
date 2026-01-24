import React, { useState } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  rounded?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999"%3EImage%3C/text%3E%3C/svg%3E',
  aspectRatio = 'auto',
  fit = 'cover',
  rounded = false,
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const classes = [
    'image',
    `image-fit-${fit}`,
    aspectRatio !== 'auto' ? `image-aspect-${aspectRatio.replace(':', '-')}` : '',
    rounded ? 'image-rounded' : '',
    isLoading ? 'image-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="image-wrapper">
      <img
        {...props}
        src={hasError ? fallback : src}
        alt={alt}
        className={classes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && <div className="image-skeleton" />}
    </div>
  );
};

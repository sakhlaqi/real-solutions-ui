import React, { useRef } from 'react';
import './FileUpload.css';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  multiple = false,
  onChange,
  error,
  helperText,
  disabled = false,
  maxSize,
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && maxSize) {
      const oversized = Array.from(files).some(file => file.size > maxSize);
      if (oversized) {
        alert(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(2)}MB`);
        return;
      }
    }

    if (onChange) {
      onChange(files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`file-upload-container ${className}`}>
      {label && <label className="file-upload-label">{label}</label>}
      <div
        className={`file-upload-dropzone ${error ? 'file-upload-error' : ''} ${disabled ? 'file-upload-disabled' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-upload-input"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className="file-upload-content">
          <span className="file-upload-icon">📁</span>
          <p className="file-upload-text">
            Click to upload or drag and drop
          </p>
          {accept && (
            <p className="file-upload-hint">
              Accepted: {accept}
            </p>
          )}
          {maxSize && (
            <p className="file-upload-hint">
              Max size: {(maxSize / 1024 / 1024).toFixed(2)}MB
            </p>
          )}
        </div>
      </div>
      {error && <span className="file-upload-error-text">{error}</span>}
      {helperText && !error && <span className="file-upload-helper-text">{helperText}</span>}
    </div>
  );
};

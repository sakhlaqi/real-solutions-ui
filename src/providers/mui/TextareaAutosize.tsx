/**
 * MUI TextareaAutosize Component
 */

import React from 'react';
import { TextField } from '@mui/material';

export interface TextareaAutosizeProps {
  value?: string;
  onChange?: (value: string) => void;
  minRows?: number;
  maxRows?: number;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const TextareaAutosize: React.FC<TextareaAutosizeProps> = ({
  value = '',
  onChange,
  minRows = 1,
  maxRows,
  label,
  error = false,
  helperText,
  fullWidth = false,
  disabled,
  placeholder,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <TextField
      multiline
      value={value}
      onChange={handleChange}
      minRows={minRows}
      maxRows={maxRows}
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
    />
  );
};

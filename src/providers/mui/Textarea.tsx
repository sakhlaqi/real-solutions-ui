/**
 * MUI Textarea Wrapper
 */

import React from 'react';
import { TextField } from '@mui/material';

export interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  error?: string | boolean;
  helperText?: string;
  maxLength?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  label,
  placeholder,
  rows = 4,
  disabled = false,
  required = false,
  error,
  helperText,
  maxLength,
}) => {
  const errorText = typeof error === 'string' ? error : helperText;
  const hasError = Boolean(error);

  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      multiline
      rows={rows}
      disabled={disabled}
      required={required}
      error={hasError}
      helperText={errorText}
      fullWidth
      inputProps={{
        maxLength,
      }}
    />
  );
};

Textarea.displayName = 'MUITextarea';

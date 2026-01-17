import React from 'react';
import type { TextareaProps as BaseTextareaProps } from '../../core/types';
import { Textarea as ShadcnTextarea } from './ui/textarea';
import { Label } from './ui/label';
import { cn } from './utils';

/**
 * Shadcn Textarea Adapter
 * Maps library's TextareaProps to shadcn/ui Textarea
 */
export const Textarea: React.FC<BaseTextareaProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  required,
  error,
  helperText,
  label,
  fullWidth,
  rows,
  minRows,
  maxRows,
  className,
  id,
  name,
}) => {
  const textareaId = id || `textarea-${name || 'field'}`;
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', className)}>
      {label && (
        <Label htmlFor={textareaId}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <ShadcnTextarea
        id={textareaId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows || minRows}
        className={cn(
          hasError && 'border-destructive focus-visible:ring-destructive',
          maxRows && `max-h-[${maxRows * 1.5}rem]`
        )}
      />

      {(error || helperText) && (
        <p
          className={cn(
            'text-sm',
            hasError ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Textarea.displayName = 'ShadcnTextarea';

import React from 'react';
import type { BaseInputProps } from '../../core/types';
import { Input as ShadcnInput } from './ui/input';
import { Label } from './ui/label';
import { cn } from './utils';

/**
 * Shadcn Input Adapter
 * Maps library's BaseInputProps to shadcn/ui Input
 */
export const Input: React.FC<BaseInputProps> = ({
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
  size,
  startAdornment,
  endAdornment,
  className,
  id,
  name,
  autoComplete,
  type = 'text',
}) => {
  const inputId = id || `input-${name || 'field'}`;
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', className)}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {startAdornment && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startAdornment}
          </div>
        )}
        
        <ShadcnInput
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={cn(
            hasError && 'border-destructive focus-visible:ring-destructive',
            startAdornment && 'pl-10',
            endAdornment && 'pr-10',
            size === 'small' && 'h-8 text-xs',
            size === 'large' && 'h-12 text-base'
          )}
        />
        
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endAdornment}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn(
          'text-sm',
          hasError ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Input.displayName = 'ShadcnInput';

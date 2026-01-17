import React from 'react';
import type { CheckboxProps as BaseCheckboxProps } from '../../core/types';
import { Checkbox as ShadcnCheckbox } from './ui/checkbox';
import { Label } from './ui/label';
import { cn } from './utils';

/**
 * Shadcn Checkbox Adapter
 * Maps library's CheckboxProps to shadcn/ui Checkbox
 */
export const Checkbox: React.FC<BaseCheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  className,
}) => {
  const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <ShadcnCheckbox
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(checked) => {
          if (onChange) {
            // Create a synthetic event
            const event = {
              target: { checked: checked === true },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
          }
        }}
        disabled={disabled}
      />
      {label && (
        <Label
          htmlFor={checkboxId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      )}
    </div>
  );
};

Checkbox.displayName = 'ShadcnCheckbox';

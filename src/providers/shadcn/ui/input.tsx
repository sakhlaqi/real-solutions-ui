import * as React from 'react';
import { cn } from '../utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    // Handle controlled vs uncontrolled input properly
    const inputProps: any = {
      type,
      className: cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      ),
      ref,
      ...props,
    };

    // If value is provided without onChange, make it read-only or use defaultValue
    if (value !== undefined) {
      if (onChange) {
        inputProps.value = value;
        inputProps.onChange = onChange;
      } else {
        inputProps.defaultValue = value;
      }
    } else if (onChange) {
      inputProps.onChange = onChange;
    }

    return <input {...inputProps} />;
  }
);
Input.displayName = 'Input';

export { Input };

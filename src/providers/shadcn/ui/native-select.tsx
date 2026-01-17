import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../utils';

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'border-input bg-background ring-offset-background focus-visible:ring-ring peer flex h-10 w-full appearance-none rounded-md border px-3 py-2 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon
          className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 peer-disabled:opacity-50"
          aria-hidden="true"
        />
      </div>
    );
  }
);
NativeSelect.displayName = 'NativeSelect';

export interface NativeSelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  NativeSelectOptionProps
>(({ className, ...props }, ref) => {
  return <option ref={ref} className={cn(className)} {...props} />;
});
NativeSelectOption.displayName = 'NativeSelectOption';

export interface NativeSelectOptGroupProps
  extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {}

const NativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  NativeSelectOptGroupProps
>(({ className, ...props }, ref) => {
  return <optgroup ref={ref} className={cn(className)} {...props} />;
});
NativeSelectOptGroup.displayName = 'NativeSelectOptGroup';

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };

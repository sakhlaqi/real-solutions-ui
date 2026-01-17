import * as React from 'react';
import { cn } from '../utils';

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        'border-border bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100',
        className
      )}
      {...props}
    />
  );
});
Kbd.displayName = 'Kbd';

const KbdGroup = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('inline-flex items-center gap-1', className)}
    {...props}
  />
));
KbdGroup.displayName = 'KbdGroup';

export { Kbd, KbdGroup };

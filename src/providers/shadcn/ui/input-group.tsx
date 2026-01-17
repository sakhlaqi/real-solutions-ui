import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex w-full items-stretch focus-within:z-10 [&_[data-slot=input-group-control]:not(:first-child)]:rounded-l-none [&_[data-slot=input-group-control]:not(:last-child)]:rounded-r-none',
      className
    )}
    {...props}
  />
));
InputGroup.displayName = 'InputGroup';

const inputGroupAddonVariants = cva(
  'border-input bg-muted text-muted-foreground inline-flex select-none items-center gap-2 whitespace-nowrap border px-3 text-sm',
  {
    variants: {
      align: {
        'inline-start': 'rounded-l-md border-r-0',
        'inline-end': 'rounded-r-md border-l-0',
        'block-start':
          'rounded-t-md border-b-0 justify-center w-full [&:has(+[data-slot=input-group-control])]:rounded-b-none',
        'block-end':
          'rounded-b-md border-t-0 justify-center w-full [&:has(~[data-slot=input-group-control])]:rounded-t-none',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
);

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupAddonVariants> {}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputGroupAddonVariants({ align }), className)}
        {...props}
      />
    );
  }
);
InputGroupAddon.displayName = 'InputGroupAddon';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input-group-control"
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = 'InputGroupTextarea';

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
InputGroupText.displayName = 'InputGroupText';

export interface InputGroupButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(
  (
    { className, variant = 'ghost', size = 'sm', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'ring-offset-background focus-visible:ring-ring inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' &&
            'bg-primary text-primary-foreground hover:bg-primary/90',
          variant === 'destructive' &&
            'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          variant === 'outline' &&
            'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
          variant === 'secondary' &&
            'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          variant === 'link' &&
            'text-primary underline-offset-4 hover:underline',
          size === 'sm' && 'h-8 rounded-md px-3',
          size === 'lg' && 'h-11 rounded-md px-8',
          size === 'icon' && 'h-8 w-8',
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupButton.displayName = 'InputGroupButton';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};

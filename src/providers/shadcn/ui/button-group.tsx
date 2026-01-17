import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const buttonGroupVariants = cva(
  'flex items-center [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:-ml-px',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical:
          'flex-col [&>*]:w-full [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child)]:rounded-r-md [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:rounded-l-md [&>*:not(:first-child)]:-ml-0 [&>*:not(:first-child)]:-mt-px',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  asChild?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

const ButtonGroupSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-border group-data-[orientation=vertical]:h-px group-data-[orientation=vertical]:w-full group-data-[orientation=horizontal]:h-full group-data-[orientation=horizontal]:w-px',
      className
    )}
    {...props}
  />
));
ButtonGroupSeparator.displayName = 'ButtonGroupSeparator';

const ButtonGroupText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-muted-foreground inline-flex h-10 items-center justify-center whitespace-nowrap px-3 text-sm font-medium',
      className
    )}
    {...props}
  />
));
ButtonGroupText.displayName = 'ButtonGroupText';

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };

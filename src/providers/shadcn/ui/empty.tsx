import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const emptyVariants = cva('flex w-full flex-col items-center gap-6 py-12', {
  variants: {
    variant: {
      default: '',
      outline: 'border-border rounded-lg border bg-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface EmptyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Empty.displayName = 'Empty';

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col items-center gap-4 text-center', className)}
    {...props}
  />
));
EmptyHeader.displayName = 'EmptyHeader';

const emptyMediaVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      default:
        'bg-muted/50 relative h-24 w-24 rounded-full before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-transparent before:to-background/80',
      icon: 'text-muted-foreground/50 h-16 w-16 [&>svg]:h-full [&>svg]:w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface EmptyMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyMediaVariants> {}

const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyMediaVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
EmptyMedia.displayName = 'EmptyMedia';

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
EmptyTitle.displayName = 'EmptyTitle';

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
EmptyDescription.displayName = 'EmptyDescription';

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2', className)}
    {...props}
  />
));
EmptyContent.displayName = 'EmptyContent';

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const itemVariants = cva(
  'group relative flex w-full items-center gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-card',
        outline: 'border-border rounded-lg border bg-card',
        muted: 'bg-muted/50 rounded-lg',
      },
      size: {
        default: 'p-4',
        sm: 'p-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(itemVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Item.displayName = 'Item';

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
));
ItemGroup.displayName = 'ItemGroup';

const ItemSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bg-border h-px w-full', className)}
    {...props}
  />
));
ItemSeparator.displayName = 'ItemSeparator';

const itemMediaVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    variant: {
      default: '',
      icon: 'text-muted-foreground [&>svg]:h-5 [&>svg]:w-5',
      image:
        'overflow-hidden rounded-md [&>img]:aspect-square [&>img]:h-8 [&>img]:w-8 [&>img]:object-cover',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ItemMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemMediaVariants> {}

const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(itemMediaVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
ItemMedia.displayName = 'ItemMedia';

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex min-w-0 flex-1 flex-col gap-1', className)}
    {...props}
  />
));
ItemContent.displayName = 'ItemContent';

const ItemTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn('text-sm font-medium leading-none', className)}
    {...props}
  />
));
ItemTitle.displayName = 'ItemTitle';

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
ItemDescription.displayName = 'ItemDescription';

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex shrink-0 items-center gap-2', className)}
    {...props}
  />
));
ItemActions.displayName = 'ItemActions';

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full flex-col', className)}
    {...props}
  />
));
ItemHeader.displayName = 'ItemHeader';

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full flex-col pt-2', className)}
    {...props}
  />
));
ItemFooter.displayName = 'ItemFooter';

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
};

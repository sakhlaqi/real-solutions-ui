import * as React from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { cn } from '../utils';

export interface SpinnerProps extends React.ComponentProps<'svg'> {}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LoaderCircleIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };

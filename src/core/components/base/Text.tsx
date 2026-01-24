/**
 * Text Component (Legacy - Not Exported)
 * 
 * NOTE: This component is no longer exported from the base components.
 * Use components from typography/ instead:
 * - For headings: import { Heading } from '@/components/typography'
 * - For text: import { Text } from '@/components/typography'
 * 
 * This file is kept for reference only.
 */

import React from 'react';
import './Text.css';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render as */
  as?: 'p' | 'span' | 'div' | 'label' | 'small';
  /** Text size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /** Text color variant */
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text content */
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  color,
  weight = 'normal',
  align = 'left',
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'text',
    `text-size-${size}`,
    color ? `text-color-${color}` : '',
    `text-weight-${weight}`,
    `text-align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes} {...props}>{children}</Component>;
};

export default Text;

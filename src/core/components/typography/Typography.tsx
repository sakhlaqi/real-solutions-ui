import React from 'react';
import './Typography.css';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  weight = 'bold',
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const classes = [`heading`, `heading-${level}`, `heading-weight-${weight}`, className]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};

export interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  color,
  align,
  className = '',
}) => {
  const classes = [
    'text',
    `text-${size}`,
    `text-weight-${weight}`,
    color ? `text-color-${color}` : '',
    align ? `text-align-${align}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};

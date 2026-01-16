import React from 'react';
import './Section.css';

export interface SectionProps {
  children: React.ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  as: Component = 'section',
  padding = 'md',
  className = '',
}) => {
  const classes = [`section`, `section-padding-${padding}`, className]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};

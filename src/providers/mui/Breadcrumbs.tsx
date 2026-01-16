import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BreadcrumbsProps } from '../../core/types';

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  maxItems,
  className,
}) => {
  return (
    <MuiBreadcrumbs
      separator={separator || <NavigateNextIcon fontSize="small" />}
      maxItems={maxItems}
      className={className}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        }

        if (item.href) {
          return (
            <Link key={index} href={item.href} underline="hover" color="inherit">
              {item.label}
            </Link>
          );
        }

        if (item.onClick) {
          return (
            <Link
              key={index}
              component="button"
              onClick={item.onClick}
              underline="hover"
              color="inherit"
            >
              {item.label}
            </Link>
          );
        }

        return (
          <Typography key={index} color="text.secondary">
            {item.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};

Breadcrumbs.displayName = 'MUIBreadcrumbs';

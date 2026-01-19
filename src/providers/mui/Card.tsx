/**
 * MUI Card Component
 * Material-UI Card wrapper providing surface styling and elevation
 * @see https://mui.com/material-ui/react-card/
 */

import React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { SxProps, Theme } from '@mui/material/styles';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card variant */
  variant?: 'elevation' | 'outlined';
  /** Internal padding size (maps to MUI spacing) */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shadow elevation (0-24) */
  elevation?: number;
  /** Shadow size (deprecated - use elevation) */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover lift effect */
  hover?: boolean;
  /** Whether card is interactive (clickable) */
  interactive?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}

/**
 * Card component using MUI Card
 * Provides a surface container for content with elevation and optional interactivity
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevation',
  padding = 'md',
  elevation: elevationProp,
  shadow,
  hover = false,
  interactive = false,
  className,
  onClick,
  sx,
}) => {
  // Map padding prop to MUI spacing
  const paddingMap = {
    none: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  // Map shadow to elevation if elevation not provided
  const shadowMap = { none: 0, sm: 1, md: 2, lg: 4 };
  const elevation = elevationProp ?? (shadow ? shadowMap[shadow] : 1);

  const cardSx: SxProps<Theme> = {
    p: paddingMap[padding],
    transition: 'transform 0.2s, box-shadow 0.2s',
    ...(hover && {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[Math.min(elevation + 2, 24)],
      },
    }),
    ...(interactive && {
      cursor: 'pointer',
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      },
    }),
    ...sx,
  };

  const content = interactive ? (
    <CardActionArea
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {children}
    </CardActionArea>
  ) : (
    children
  );

  return (
    <MuiCard
      variant={variant}
      elevation={variant === 'elevation' ? elevation : 0}
      className={className}
      onClick={!interactive ? onClick : undefined}
      sx={cardSx}
      tabIndex={interactive && !onClick ? 0 : undefined}
    >
      {content}
    </MuiCard>
  );
};

Card.displayName = 'MUICard';

// Re-export MUI Card sub-components for convenience
export { CardContent, CardHeader, CardActions, CardMedia, CardActionArea };

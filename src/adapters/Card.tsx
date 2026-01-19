/**
 * Adaptive Card Component
 * 
 * Uses MUI Card for all providers.
 */

import React from 'react';
import {
  Card as MUICard,
  MUICardProps as CardProps,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  CardActionArea,
} from '../providers/mui';

export type { CardProps };
export { CardContent, CardHeader, CardActions, CardMedia, CardActionArea };

/**
 * Adaptive Card Component
 * 
 * @example
 * ```tsx
 * <Card padding="lg" elevation={2}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = (props) => {
  return <MUICard {...props} />;
};

Card.displayName = 'AdapterCard';

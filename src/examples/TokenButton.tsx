/**
 * Token-Aware Button Component Example
 * 
 * Demonstrates how components should consume design tokens instead of hardcoded values.
 * This pattern should be applied to all UI components.
 */

import React from 'react';
import { useTokens } from '../core/context';

export interface TokenButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

/**
 * Token-aware button that uses semantic tokens for all styling
 */
export const TokenButton: React.FC<TokenButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  fullWidth = false,
}) => {
  const tokens = useTokens();

  // Size mapping using tokens
  const sizeStyles = {
    small: {
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: tokens.typography.fontSize.sm,
    },
    medium: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.typography.fontSize.base,
    },
    large: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      fontSize: tokens.typography.fontSize.lg,
    },
  };

  // Variant mapping using tokens
  const variantStyles = {
    primary: {
      backgroundColor: disabled
        ? tokens.colors.textDisabled
        : tokens.colors.primary,
      color: tokens.colors.textInverse,
      border: 'none',
      '&:hover': {
        backgroundColor: tokens.colors.primaryLight,
      },
      '&:active': {
        backgroundColor: tokens.colors.primaryDark,
      },
    },
    secondary: {
      backgroundColor: disabled
        ? tokens.colors.textDisabled
        : tokens.colors.secondary,
      color: tokens.colors.textInverse,
      border: 'none',
      '&:hover': {
        backgroundColor: tokens.colors.accent,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: disabled
        ? tokens.colors.textDisabled
        : tokens.colors.primary,
      border: `1px solid ${disabled ? tokens.colors.borderLight || tokens.colors.border : tokens.colors.primary}`,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderColor: tokens.colors.primaryLight,
      },
    },
    text: {
      backgroundColor: 'transparent',
      color: disabled
        ? tokens.colors.textDisabled
        : tokens.colors.primary,
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  };

  const baseStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: tokens.typography.lineHeight.normal,
    borderRadius: tokens.radius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: `all ${tokens.motion.duration.fast} ${tokens.motion.easing.easeInOut}`,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    outline: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      style={baseStyles}
      disabled={disabled}
      onClick={onClick}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.colors.borderFocus}`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = tokens.colors.primaryLight || tokens.colors.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = tokens.colors.primary;
        }
      }}
    >
      {children}
    </button>
  );
};

export default TokenButton;

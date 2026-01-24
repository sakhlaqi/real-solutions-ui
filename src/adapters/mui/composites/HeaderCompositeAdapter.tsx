import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  IconButton,
  Stack,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { HeaderCompositeProps } from '../../../core/composites/Header/types';

/**
 * MUI AppBar Adapter for HeaderComposite
 * 
 * Maps HeaderComposite interface to MUI AppBar/Toolbar implementation.
 * Provides page header with breadcrumbs, title, and actions.
 */
export const HeaderCompositeAdapter: React.FC<HeaderCompositeProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions = [],
  showBackButton = false,
  onBack,
  children,
  className = '',
  testId = 'header-composite',
}) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={className}
      data-testid={testId}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar sx={{ gap: 2, py: 2 }}>
        {/* Back Button */}
        {showBackButton && (
          <IconButton
            onClick={onBack}
            edge="start"
            aria-label="back"
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {/* Title Section */}
        <Box sx={{ flex: 1 }}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <MuiBreadcrumbs sx={{ mb: 1 }}>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return isLast ? (
                  <Typography key={crumb.label} color="text.primary">
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={crumb.label}
                    color="inherit"
                    href={crumb.path}
                    underline="hover"
                    onClick={(e) => {
                      if (crumb.onClick) {
                        e.preventDefault();
                        crumb.onClick();
                      }
                    }}
                  >
                    {crumb.label}
                  </Link>
                );
              })}
            </MuiBreadcrumbs>
          )}

          {/* Title */}
          <Typography variant="h5" component="h1" fontWeight={600}>
            {title}
          </Typography>

          {/* Subtitle */}
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Custom Content */}
        {children}

        {/* Actions */}
        {actions.length > 0 && (
          <Stack direction="row" spacing={1}>
            {actions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant === 'primary' ? 'contained' : 'outlined'}
                color={action.variant === 'danger' ? 'error' : 'primary'}
                onClick={() => action.onClick?.()}
                disabled={action.disabled}
                startIcon={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderCompositeAdapter;

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SidebarCompositeProps, NavigationItem } from '../../../core/composites/Sidebar/types';

/**
 * MUI Drawer Adapter for SidebarComposite
 * 
 * Maps SidebarComposite interface to MUI Drawer/List implementation.
 * Provides collapsible navigation sidebar with nested menu items.
 */
export const SidebarCompositeAdapter: React.FC<SidebarCompositeProps> = ({
  items,
  header,
  footer,
  collapsible = true,
  collapsed: controlledCollapsed,
  onCollapse,
  onNavigate,
  className = '',
  testId = 'sidebar-composite',
}) => {
  // Internal collapse state
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  // Track expanded parent items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    if (onCollapse) {
      onCollapse(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.disabled) return;

    // If item has children, toggle expansion
    if (item.children && item.children.length > 0) {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
        } else {
          next.add(item.id);
        }
        return next;
      });
    } else {
      // Navigate
      if (item.onClick) {
        item.onClick();
      } else if (onNavigate) {
        onNavigate(item);
      }
    }
  };

  const renderNavItem = (item: NavigationItem, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    const listItemContent = (
      <>
        {/* Icon */}
        {item.icon && (
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
            {item.badge ? (
              <Badge
                badgeContent={item.badge}
                color="error"
                variant={typeof item.badge === 'number' ? 'standard' : 'dot'}
              >
                {item.icon}
              </Badge>
            ) : (
              item.icon
            )}
          </ListItemIcon>
        )}

        {/* Label */}
        {!collapsed && (
          <>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: item.active ? 600 : 400,
              }}
            />
            {hasChildren && (isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            {!hasChildren && item.badge && (
              <Badge
                badgeContent={item.badge}
                color="error"
                variant={typeof item.badge === 'number' ? 'standard' : 'dot'}
              />
            )}
          </>
        )}
      </>
    );

    const listItem = (
      <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          selected={item.active}
          sx={{
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
            pl: 2.5 + depth * 2,
          }}
        >
          {collapsed ? (
            <Tooltip title={item.label} placement="right">
              {listItemContent}
            </Tooltip>
          ) : (
            listItemContent
          )}
        </ListItemButton>

        {/* Nested Items */}
        {!collapsed && hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </ListItem>
    );

    return listItem;
  };

  const drawerWidth = collapsed ? 64 : 280;

  return (
    <Drawer
      variant="permanent"
      className={className}
      data-testid={testId}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      {/* Header */}
      {header && (
        <Box sx={{ p: 2 }}>
          {header}
        </Box>
      )}
      {(header || collapsible) && <Divider />}

      {/* Navigation Items */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          {items.map((item) => renderNavItem(item))}
        </List>
      </Box>

      {/* Footer */}
      {footer && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            {footer}
          </Box>
        </>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <IconButton onClick={handleCollapseToggle}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default SidebarCompositeAdapter;

import React, { useState } from 'react';
import { Box, Tabs as MuiTabs, Tab } from '@mui/material';
import type { TabsLayoutProps } from '../../../core/templates/TabsLayout/types';

/**
 * MUI TabsLayout Adapter
 * 
 * Maps TabsLayout template to MUI Tabs implementation.
 * Provides tabbed interface with automatic tab panel management.
 */
export const TabsLayoutAdapter: React.FC<TabsLayoutProps> = ({
  slots,
  activeTab: controlledActiveTab,
  onTabChange,
  tabLabels,
  className = '',
  style,
  testId = 'tabs-layout',
}) => {
  // Internal active tab state
  const tabKeys = Object.keys(slots.tabs || {});
  const [internalActiveTab, setInternalActiveTab] = useState(tabKeys[0] || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (onTabChange) {
      onTabChange(newValue);
    } else {
      setInternalActiveTab(newValue);
    }
  };

  return (
    <Box
      className={className}
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...style,
      }}
    >
      {/* Header */}
      {slots.header && (
        <Box
          component="header"
          sx={{
            flexShrink: 0,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {slots.header}
        </Box>
      )}

      {/* Tabs Navigation */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <MuiTabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="tabs navigation"
        >
          {tabKeys.map((key) => (
            <Tab
              key={key}
              value={key}
              label={tabLabels?.[key] || key}
              id={`tab-${key}`}
              aria-controls={`tabpanel-${key}`}
            />
          ))}
        </MuiTabs>
      </Box>

      {/* Tab Panels */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {tabKeys.map((key) => (
          <Box
            key={key}
            role="tabpanel"
            hidden={activeTab !== key}
            id={`tabpanel-${key}`}
            aria-labelledby={`tab-${key}`}
            sx={{
              p: 3,
              display: activeTab === key ? 'block' : 'none',
            }}
          >
            {slots.tabs?.[key]}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      {slots.footer && (
        <Box
          component="footer"
          sx={{
            flexShrink: 0,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          {slots.footer}
        </Box>
      )}
    </Box>
  );
};

export default TabsLayoutAdapter;

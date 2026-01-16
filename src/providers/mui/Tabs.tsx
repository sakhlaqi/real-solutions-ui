import React from 'react';
import { Tabs as MuiTabs, Tab } from '@mui/material';
import { BaseTabsProps } from '../../core/types';

export const Tabs: React.FC<BaseTabsProps> = ({
  value,
  onChange,
  tabs,
  variant = 'standard',
  orientation = 'horizontal',
  className,
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string | number) => {
    onChange(newValue);
  };

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      variant={variant}
      orientation={orientation}
      className={className}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          icon={tab.icon as React.ReactElement | undefined}
          disabled={tab.disabled}
        />
      ))}
    </MuiTabs>
  );
};

Tabs.displayName = 'MUITabs';

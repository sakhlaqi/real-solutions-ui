/**
 * MUI BottomNavigation Wrapper
 */

import React from 'react';
import {
  BottomNavigation as MUIBottomNavigationBase,
  BottomNavigationAction as MUIBottomNavigationAction,
} from '@mui/material';

export interface BottomNavigationAction {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export interface BottomNavigationProps {
  value: string;
  onChange: (value: string) => void;
  actions: BottomNavigationAction[];
  showLabels?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  value,
  onChange,
  actions,
  showLabels = true,
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <MUIBottomNavigationBase
      value={value}
      onChange={handleChange}
      showLabels={showLabels}
    >
      {actions.map((action) => (
        <MUIBottomNavigationAction
          key={action.value}
          label={action.label}
          value={action.value}
          icon={action.icon}
        />
      ))}
    </MUIBottomNavigationBase>
  );
};

BottomNavigation.displayName = 'MUIBottomNavigation';

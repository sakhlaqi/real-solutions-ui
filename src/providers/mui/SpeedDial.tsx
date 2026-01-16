/**
 * MUI SpeedDial Wrapper
 */

import React from 'react';
import { SpeedDial as MUISpeedDialBase, SpeedDialAction } from '@mui/material';

export interface SpeedDialActionItem {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
}

export interface SpeedDialProps {
  actions: SpeedDialActionItem[];
  icon: React.ReactElement;
  ariaLabel: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  hidden?: boolean;
}

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions,
  icon,
  ariaLabel,
  direction = 'up',
  hidden = false,
}) => {
  return (
    <MUISpeedDialBase
      ariaLabel={ariaLabel}
      icon={icon}
      direction={direction}
      hidden={hidden}
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </MUISpeedDialBase>
  );
};

SpeedDial.displayName = 'MUISpeedDial';

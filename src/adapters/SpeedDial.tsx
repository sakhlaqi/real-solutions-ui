/**
 * Adaptive SpeedDial Component
 * 
 * Uses MUI SpeedDial for all providers.
 */

import React from 'react';
import { SpeedDial as MUISpeedDial } from '../providers/mui';

export interface SpeedDialAction {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
}

export interface SpeedDialProps {
  actions: SpeedDialAction[];
  icon: React.ReactElement;
  ariaLabel: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  hidden?: boolean;
}

/**
 * Adaptive SpeedDial Component
 * 
 * @example
 * ```tsx
 * <SpeedDial
 *   icon={<AddIcon />}
 *   ariaLabel="Actions"
 *   actions={[
 *     { icon: <SaveIcon />, name: 'Save', onClick: handleSave },
 *     { icon: <PrintIcon />, name: 'Print', onClick: handlePrint },
 *   ]}
 * />
 * ```
 */
export const SpeedDial: React.FC<SpeedDialProps> = (props) => {
  return <MUISpeedDial {...props} />;
};

SpeedDial.displayName = 'AdapterSpeedDial';

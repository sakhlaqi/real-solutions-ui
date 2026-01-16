/**
 * Adaptive SpeedDial Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { SpeedDial as InternalSpeedDial } from '../navigation';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUISpeedDial {...props} />;
  }
  
  // Transform props for internal (name -> label)
  const { actions, ariaLabel, direction, hidden, ...restProps } = props;
  const internalActions = actions.map(action => ({
    ...action,
    label: action.name,
  }));
  
  return (
    <InternalSpeedDial
      {...restProps}
      actions={internalActions}
      ariaLabel={ariaLabel}
      direction={direction}
    />
  );
};

SpeedDial.displayName = 'AdapterSpeedDial';

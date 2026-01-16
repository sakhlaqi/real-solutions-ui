/**
 * MUI List Wrapper
 */

import React from 'react';
import { List as MUIListBase } from '@mui/material';

export interface ListProps {
  children: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
}

export const List: React.FC<ListProps> = ({
  children,
  dense = false,
  disablePadding = false,
}) => {
  return (
    <MUIListBase dense={dense} disablePadding={disablePadding}>
      {children}
    </MUIListBase>
  );
};

List.displayName = 'MUIList';

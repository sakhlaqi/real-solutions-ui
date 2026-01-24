import React, { useState, useMemo } from 'react';
import type { SearchGridCompositeProps } from '../../../core/composites/SearchGrid/types';
// Fallback to MUI adapter
import { SearchGridCompositeAdapter as MUISearchGridAdapter } from '../../mui/composites/SearchGridCompositeAdapter';

/**
 * Internal SearchGridComposite Adapter
 * 
 * Fallback implementation using MUI DataGrid.
 * Can be replaced with a custom internal implementation in the future.
 */
export const SearchGridCompositeAdapter = <T extends Record<string, any>>(
  props: SearchGridCompositeProps<T>
) => {
  return <MUISearchGridAdapter {...props} />;
};

export default SearchGridCompositeAdapter;

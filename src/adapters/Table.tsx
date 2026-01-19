/**
 * Adapter Table Component
 * 
 * Uses MUI DataGrid/DataTable for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import { BaseTableProps } from '../core/types';
import { DataTable as MUIDataTable } from '../providers/mui';

/**
 * Adaptive Table Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Table 
 *   rows={users}
 *   columns={[
 *     { field: 'name', header: 'Name' },
 *     { field: 'email', header: 'Email' }
 *   ]}
 * />
 * ```
 */
export function Table<T = any>(props: BaseTableProps<T>) {
  return <MUIDataTable {...(props as any)} />;
}

Table.displayName = 'AdapterTable';

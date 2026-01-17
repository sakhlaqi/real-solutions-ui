/**
 * Adapter Table Component
 * 
 * Dynamically switches between internal and MUI table implementations
 * based on the current UIProvider context.
 */

import { BaseTableProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Table as InternalTable } from '../data-display';
import { DataTable as MUIDataTable } from '../providers/mui';
import { Table as RadixTable } from '../providers/radix';
import { Table as ShadcnTable } from '../providers/shadcn';

/**
 * Adaptive Table Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
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
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnTable {...(props as any)} />;
  }
  
  if (provider === 'mui') {
    return <MUIDataTable {...(props as any)} />;
  }
  
  if (provider === 'radix') {
    return <RadixTable {...(props as any)} />;
  }
  
  // Transform 'rows' to 'data' for internal Table
  const { rows, columns, ...restProps } = props;
  const internalColumns = columns.map((col: any) => ({
    key: col.field || col.key,
    header: col.headerName || col.header || col.label,
    width: col.width,
    align: col.align,
    render: col.render,
  }));
  
  return <InternalTable data={rows || []} columns={internalColumns} {...restProps} />;
}

Table.displayName = 'AdapterTable';

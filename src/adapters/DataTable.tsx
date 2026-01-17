/**
 * Adaptive DataTable Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import { useUIContext } from '../core/context';
import { DataTable as ShadcnDataTable } from '../providers/shadcn';

export interface DataTableProps<TData = any> {
  columns: any[];
  data: TData[];
  className?: string;
}

/**
 * Adaptive DataTable Component
 * 
 * @example
 * ```tsx
 * <DataTable
 *   columns={columns}
 *   data={data}
 * />
 * ```
 */
export function DataTable<TData = any>(props: DataTableProps<TData>) {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnDataTable {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnDataTable {...props} />;
}

DataTable.displayName = 'AdapterDataTable';

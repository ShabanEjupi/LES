// Classic Data Grid Component - Albanian Customs Administration (LES)
// Komponenti i Tabelës së Të Dhënave Klasike - Administrata Doganore e Shqipërisë
import React, { useState, useMemo } from 'react';
import { ClassicButton } from './ClassicButton';
import './ClassicDataGrid.css';

export interface ColumnDefinition<T = Record<string, unknown>> {
  id: string;
  header: string;
  headerEn?: string;
  accessor?: keyof T | ((row: T) => unknown);
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface ClassicDataGridProps<T = Record<string, unknown>> {
  data: T[];
  columns: ColumnDefinition<T>[];
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  selectedRowIndex?: number;
  multiSelect?: boolean;
  selectedRows?: number[];
  onSelectionChange?: (selectedRows: number[]) => void;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  height?: number | string;
  striped?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

/**
 * ClassicDataGrid - Authentic Windows 98/XP style data table
 * Provides classic Windows data grid appearance with Albanian localization
 * Used throughout the Albanian Customs Administration system
 */
export const ClassicDataGrid = <T,>({
  data,
  columns,
  onRowClick,
  onRowDoubleClick,
  selectedRowIndex,
  multiSelect = false,
  selectedRows = [],
  onSelectionChange,
  sortable = true,
  filterable = true,
  pagination = true,
  pageSize = 25,
  loading = false,
  emptyMessage = 'Nuk ka të dhëna për t\'u shfaqur',
  className = '',
  height = 'auto',
  striped = true
}: ClassicDataGridProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters and sorting
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.entries(filters).forEach(([columnId, filterValue]) => {
      if (filterValue.trim()) {
        const column = columns.find(col => col.id === columnId);
        if (column) {
          filtered = filtered.filter(row => {
            const value = column.accessor 
              ? typeof column.accessor === 'function' 
                ? column.accessor(row)
                : row[column.accessor]
              : row[columnId as keyof T];
            
            return String(value || '').toLowerCase().includes(filterValue.toLowerCase());
          });
        }
      }
    });

    // Apply sorting
    if (sortState.column && sortState.direction) {
      const column = columns.find(col => col.id === sortState.column);
      if (column) {
        filtered.sort((a, b) => {
          const aValue = column.accessor 
            ? typeof column.accessor === 'function' 
              ? column.accessor(a)
              : a[column.accessor]
            : a[sortState.column as keyof T];
          
          const bValue = column.accessor 
            ? typeof column.accessor === 'function' 
              ? column.accessor(b)
              : b[column.accessor]
            : b[sortState.column as keyof T];

          let comparison = 0;
          const aStr = String(aValue || '');
          const bStr = String(bValue || '');
          
          if (aStr < bStr) comparison = -1;
          if (aStr > bStr) comparison = 1;

          return sortState.direction === 'desc' ? -comparison : comparison;
        });
      }
    }

    return filtered;
  }, [data, filters, sortState, columns]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = pagination ? processedData.slice(startIndex, endIndex) : processedData;

  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;

    setSortState(prev => {
      if (prev.column === columnId) {
        if (prev.direction === 'asc') return { column: columnId, direction: 'desc' };
        if (prev.direction === 'desc') return { column: null, direction: null };
      }
      return { column: columnId, direction: 'asc' };
    });
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({ ...prev, [columnId]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleRowClick = (row: T, _index: number, originalIndex: number) => {
    if (multiSelect && onSelectionChange) {
      const newSelection = selectedRows.includes(originalIndex)
        ? selectedRows.filter(i => i !== originalIndex)
        : [...selectedRows, originalIndex];
      onSelectionChange(newSelection);
    }
    
    if (onRowClick) {
      onRowClick(row, originalIndex);
    }
  };

  const getSortIcon = (columnId: string) => {
    if (sortState.column !== columnId) return '↕';
    return sortState.direction === 'asc' ? '↑' : '↓';
  };

  const gridStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height
  };

  return (
    <div className={`classic-datagrid ${className}`} style={gridStyle}>
      {loading && (
        <div className="classic-datagrid__loading">
          <span>Duke ngarkuar...</span>
        </div>
      )}

      <div className="classic-datagrid__container">
        <table className={`classic-datagrid__table ${striped ? 'classic-datagrid__table--striped' : ''}`}>
          <thead className="classic-datagrid__header">
            {filterable && (
              <tr className="classic-datagrid__filter-row">
                {multiSelect && <th className="classic-datagrid__select-header"></th>}
                {columns.map(column => (
                  <th key={`filter-${column.id}`} style={{ width: column.width }}>
                    {column.filterable !== false && (
                      <input
                        type="text"
                        className="classic-datagrid__filter-input"
                        placeholder={`Filtro ${column.header}...`}
                        value={filters[column.id] || ''}
                        onChange={(e) => handleFilterChange(column.id, e.target.value)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
            <tr className="classic-datagrid__header-row">
              {multiSelect && (
                <th className="classic-datagrid__select-header">
                  <input
                    type="checkbox"
                    className="classic-datagrid__select-all"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => {
                      if (onSelectionChange) {
                        onSelectionChange(e.target.checked ? data.map((_, i) => i) : []);
                      }
                    }}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.id}
                  className={`classic-datagrid__header-cell ${column.sortable !== false && sortable ? 'classic-datagrid__header-cell--sortable' : ''}`}
                  style={{ width: column.width, textAlign: column.align || 'left' }}
                  onClick={() => handleSort(column.id)}
                  title={column.headerEn}
                >
                  <span className="classic-datagrid__header-text">{column.header}</span>
                  {column.sortable !== false && sortable && (
                    <span className="classic-datagrid__sort-icon">
                      {getSortIcon(column.id)}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="classic-datagrid__body">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (multiSelect ? 1 : 0)}
                  className="classic-datagrid__empty-message"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => {
                const originalIndex = startIndex + index;
                const isSelected = selectedRowIndex === originalIndex || selectedRows.includes(originalIndex);
                
                return (
                  <tr
                    key={originalIndex}
                    className={`classic-datagrid__row ${isSelected ? 'classic-datagrid__row--selected' : ''}`}
                    onClick={() => handleRowClick(row, index, originalIndex)}
                    onDoubleClick={() => onRowDoubleClick?.(row, originalIndex)}
                  >
                    {multiSelect && (
                      <td className="classic-datagrid__select-cell">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(originalIndex)}
                          onChange={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    {columns.map(column => {
                      const value = column.accessor 
                        ? typeof column.accessor === 'function' 
                          ? column.accessor(row)
                          : row[column.accessor]
                        : row[column.id as keyof T];

                      return (
                        <td
                          key={column.id}
                          className="classic-datagrid__cell"
                          style={{ textAlign: column.align || 'left' }}
                        >
                          {column.render ? column.render(value, row, originalIndex) : String(value || '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="classic-datagrid__pagination">
          <ClassicButton
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            « Mëparshme
          </ClassicButton>
          
          <span className="classic-datagrid__page-info">
            Faqja {currentPage} nga {totalPages} ({processedData.length} rezultate)
          </span>
          
          <ClassicButton
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Tjetër »
          </ClassicButton>
        </div>
      )}
    </div>
  );
};

export default ClassicDataGrid;

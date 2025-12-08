'use client';

import * as React from 'react';
import {
  Column,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdChevronLeft,
  MdChevronRight,
  MdUnfoldMore,
  MdMoreHoriz,
} from 'react-icons/md';
import { DataTableProps } from '@/types/ui';
import { ClipLoader } from 'react-spinners';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

export const createSortableHeader = <TData,>(
  column: Column<TData, unknown>,
  title: string
) => {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="p-0 flex items-center text-slate-950 cursor-pointer"
    >
      {title}
      {column.getIsSorted() === 'asc' ? (
        <MdArrowDropUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <MdArrowDropDown className="ml-2 h-4 w-4" />
      ) : (
        <MdUnfoldMore className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export default function DataTable<TData extends { id: string | number }>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
  isLoading,
  renderSubComponent,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection: rowSelection || {},
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getRowId: (originalRow) => String(originalRow.id),
    enableRowSelection: !!onRowSelectionChange,
    onRowSelectionChange: onRowSelectionChange,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  const getPaginationRange = (): (number | string)[] => {
    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();

    if (totalPages <= 1) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages: Set<number> = new Set();
    pages.add(0);
    pages.add(totalPages - 1);
    pages.add(currentPage);

    if (currentPage > 0) pages.add(currentPage - 1);
    if (currentPage < totalPages - 1) pages.add(currentPage + 1);

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const result: (number | string)[] = [];

    let lastPage: number | null = null;
    for (const page of sortedPages) {
      if (lastPage !== null && page - lastPage > 1) {
        result.push('...');
      }
      result.push(page);
      lastPage = page;
    }

    return result;
  };

  const paginationRange = getPaginationRange();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-md border border-borderColor p-24">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border border-borderColor">
        <Table>
          <TableHeader className="bg-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {renderSubComponent?.({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center px-2 py-4 gap-10">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center cursor-pointer gap-1 text-slate-950 font-semibold disabled:opacity-50 disabled:cursor-default"
          type="button"
        >
          <MdChevronLeft className="w-5 h-5" /> <span>Previous</span>
        </button>

        <div className="flex items-center gap-4">
          {paginationRange.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => table.setPageIndex(page)}
                className={`flex items-center justify-center text-slate-950 ${
                  table.getState().pagination.pageIndex === page
                    ? 'border border-slate-500 rounded-lg font-semibold px-3 py-1'
                    : 'cursor-pointer'
                }`}
                type="button"
              >
                {page + 1}
              </button>
            ) : (
              <span
                key={index}
                className="flex items-end justify-center w-9 h-9"
              >
                <MdMoreHoriz className="h-5 w-5 text-slate-500" />
              </span>
            )
          )}
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center cursor-pointer gap-1 text-slate-950 font-semibold disabled:text-slate-500 disabled:cursor-default"
          type="button"
        >
          <span>Next</span> <MdChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

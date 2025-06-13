import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import type * as React from "react";
import { Clock, Radio, User } from "lucide-react";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import { Scroller } from "@/components/ui/scroller";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      {/* Desktop view */}
      <div className="hidden md:block self-center min-w-full">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="font-bold"
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
          {actionBar &&
            table.getFilteredSelectedRowModel().rows.length > 0 &&
            actionBar}
        </div>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full">
        <Scroller className="flex h-[36rem] w-full flex-col gap-2.5 p-4" hideScrollbar>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const data = row.original as any; // Type assertion for row data
              return (
                <div
                  key={row.id}
                  className="flex flex-col gap-1.5 rounded-md bg-gray-100/50 p-4"
                >
                  <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row w-1/2 gap-1.5">
                      <Badge className={`${data.side === 'Sell' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} text-xs`}>{data.side}</Badge>
                      <Badge variant={'outline'} className="text-xs">{data.ex_qty}/{data.total_qty}</Badge>
                    </div>
                    <div className="flex flex-row w-1/2 gap-1.5 justify-end items-end">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700 text-xs dark:bg-blue-600"
                      >
                        <User />
                        {data.client}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-between">
                    <div className="text-xl ml-0.5">
                      {data.ticker}
                    </div>
                    <div className="text-xl mr-1">
                      ₹{data.price}
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row w-1/2 gap-1.5">
                      <Badge className="text-xs bg-blue-100 text-blue-700">{data.product}</Badge>
                      {(() => {
                        const tickerFilters = table.getState().columnFilters.find(f => f.id === 'ticker');
                        const filteredTickers = Array.isArray(tickerFilters?.value) ? tickerFilters.value : [];
                        const ticker = row.getValue('ticker');
                        const isFiltered = filteredTickers.includes(ticker);

                        return <p>{isFiltered ? <Radio className="font-extralight text-blue-700" size={20} />: ""}</p>;
                      })()}
                    </div>
                    <div className="flex flex-row w-1/2 gap-1 justify-end items-end">
                      <Badge
                        variant="secondary"
                        className="bg-transparent text-gray-500 text-xs"
                      >
                        <Clock />
                        {new Date(data.time).toLocaleString().split(',')[1].trim()}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4">No results.</div>
          )}
        </Scroller>
      </div>
    </div>
  );
}

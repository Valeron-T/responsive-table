'use client'
import { Text, CalendarIcon, DollarSign } from "lucide-react";
// import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useEffect, useMemo } from "react";
import { validateHeaderName } from "http";
import useSWR from 'swr'
import { useSearchParams } from "next/navigation";

export default function DataTableDemo() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Dummy data and pageCount for demonstration; replace with your actual data source
  const searchParams = useSearchParams()


  const { data, isLoading, error } = useSWR(() => {
    const url = `/api/trades?${searchParams.toString()}`
    return url
  }, fetcher)

  const pageCount = 1;

  const columns = useMemo(() => {
    // Dynamic based on results (Ideally you would fetch this from your API)

    // const clientOptions = [...new Set((data ?? []).map((item) => item.client))]
    //   .map((value) => ({ value, label: value }));

    // const tickerOptions = [...new Set((data ?? []).map((item) => item.ticker))]
    //   .map((value) => ({ value, label: value }));

    // Hardcoded options for demo
    const clientOptions = [
      { value: "AAA001", label: "AAA001" },
      { value: "AAA002", label: "AAA002" },
      { value: "AAA003", label: "AAA003" },
    ]

    const tickerOptions = [
      { value: "RELIANCE", label: "RELIANCE" },
      { value: "MRF", label: "MRF" },
      { value: "INFY", label: "INFY" },
      { value: "ASIANPAINT", label: "ASIANPAINT" },
      { value: "TATAINVEST", label: "TATAINVEST" },
    ]

    // console.log("clientOptions:", clientOptions); // <- see if this logs updated values

    return [
      {
        id: "time",
        accessorKey: "time",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Time" />
        ),
        cell: ({ row }) => <div>{row.getValue("time")}</div>,
        meta: {
          label: "Time",
          placeholder: "Search time...",
          variant: "text",
          icon: CalendarIcon,
        },
      },
      {
        id: "client",
        accessorKey: "client",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Client" />
        ),
        cell: ({ row }) => <div>{row.getValue("client")}</div>,
        meta: {
          label: "Client",
          placeholder: "Search clients...",
          variant: "multiSelect",
          icon: Text,
          options: clientOptions,
        },
        enableColumnFilter: true,
      },
      {
        id: "ticker",
        accessorKey: "ticker",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ticker" />
        ),
        cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
        meta: {
          label: "Ticker",
          placeholder: "Search ticker...",
          variant: "multiSelect",
          icon: Text,
          options: tickerOptions,
        },
        enableColumnFilter: true,
      },
      {
        id: "side",
        accessorKey: "side",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Buy/Sell" />
        ),
        cell: ({ row }) => <div>{row.getValue("side")}</div>,
        meta: {
          label: "Buy/Sell",
          placeholder: "Buy or Sell...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      {
        id: "product",
        accessorKey: "product",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => <div>{row.getValue("product")}</div>,
        meta: {
          label: "Product",
          placeholder: "CNC/NRML...",
          variant: "text",
          icon: Text,
        },
      },
      {
        id: "qty",
        accessorKey: "qty",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Qty" />
        ),
        cell: ({ row }) => {
          const ex_qty = row.original.ex_qty ?? "";
          const total_qty = row.original.total_qty ?? "";
          return <div>{`${ex_qty}/${total_qty}`}</div>;
        },
        meta: {
          label: "Qty",
          placeholder: "Quantity...",
          variant: "text",
          icon: Text,
        },
      },
      {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
        meta: {
          label: "Price",
          placeholder: "Search price...",
          variant: "text",
          icon: DollarSign,
        },
      },

    ]
  }, [data]);

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    // Pass the total number of pages for the table
    pageCount,
    initialState: {
      sorting: [{ id: "time", desc: true }],
      pagination: { pageSize: 10 },
    },
    // Unique identifier for rows, can be used for unique row selection
    getRowId: (row) => row.id,
    enableFilters: true
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
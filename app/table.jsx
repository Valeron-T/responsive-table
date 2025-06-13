'use client'
import { Text, CalendarIcon, Ban, MoreHorizontal, IndianRupee, Radio, Download } from "lucide-react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useEffect, useMemo } from "react";
import useSWR from 'swr'
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TickerCard } from "../components/TickerCard";

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

    return [
      {
        id: "time",
        accessorKey: "time",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Time" />
        ),
        cell: ({ row }) => <div>{new Date(row.getValue("time")).toLocaleString().split(',')[1].trim()}</div>,
        meta: {
          label: "Time",
          placeholder: "Search time...",
          variant: "timeRange",
          icon: CalendarIcon,
        },
        enableColumnFilter: true,
      },
      {
        id: "client",
        accessorKey: "client",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Client" />
        ),
        cell: ({ row }) => <div><Badge className="text-xs bg-orange-100 text-orange-700">{row.getValue("client")}</Badge></div>,
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
        cell: ({ row }) => {
          // Show an icon if this ticker is present in the filtered tickers
          const tickerFilters = table.getState().columnFilters.find(f => f.id === 'ticker');
          const filteredTickers = Array.isArray(tickerFilters?.value) ? tickerFilters.value : [];
          const ticker = row.getValue('ticker');
          const isFiltered = filteredTickers.includes(ticker);
          return <div className="flex flex-row align-middle gap-1 items-center">
            {row.getValue('ticker')} {isFiltered && <Radio className="text-blue-500" size={18} />}
          </div>
        },
        meta: {
          label: "Ticker",
          placeholder: "Search ticker...",
          variant: "multiSelect",
          icon: Text,
          options: tickerOptions,
        },
        enableColumnFilter: true,
        enableSorting: false
      },
      {
        id: "side",
        accessorKey: "side",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Buy/Sell" />
        ),
        cell: ({ row }) => <div><Badge className={`${row.getValue('side') === 'Sell' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} text-xs`}>{row.getValue('side')}</Badge></div>,
        meta: {
          label: "Side",
          placeholder: "Buy or Sell...",
          variant: "select",
          icon: Text,
          options: [
            { value: "Buy", label: "Buy" },
            { value: "Sell", label: "Sell" },
          ],
        },
        enableColumnFilter: true,
        enableSorting: false
      },
      {
        id: "product",
        accessorKey: "product",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => <div><Badge className="text-xs bg-blue-100 text-blue-700">{row.getValue("product")}</Badge></div>,
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
          icon: IndianRupee,
        },

      },
      {
        id: "actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }
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
      columnPinning: { right: ["actions"] },
    },
    // Unique identifier for rows, can be used for unique row selection
    getRowId: (row) => row.id,
    enableFilters: true,
  });


  return (
    <>
      <div className="hidden max-md:flex flex-row gap-4 overflow-auto pb-8">
        <TickerCard ticker="TCS" currentPrice={3825} prevClose={3790} />
        <TickerCard ticker="INFY" currentPrice={3200} prevClose={3790} />
        <TickerCard ticker="REDINGTON" currentPrice={3562} prevClose={4000} />
        <TickerCard ticker="IEX" currentPrice={4202} prevClose={3790} />
      </div>

      <div className="flex flex-row justify-between w-full max-md:px-4">
        <SidebarTrigger className="max-md:block hidden" />
        <h1 className="text-2xl max-md:self-center font-bold">Open Orders</h1>
        <Button
          aria-label="Download"
          variant="default"
          size="sm"
          className="border-dashed bg-gray-200 text-black hover:text-white cursor-pointer"
        >
          <Download />
          Download
        </Button>
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <CustomCancelButton />
        </DataTableToolbar>
      </DataTable>

    </>
  );
}


function CustomCancelButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Reset filters"
          variant="destructive"
          size="sm"
          className="border-dashed cursor-pointer hover:opacity-75"
        >
          <Ban />
          Cancel All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel all your open orders. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast.success('All open orders have been cancelled successfully!')}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

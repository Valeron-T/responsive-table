import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clients = url.searchParams.getAll("client").flatMap(c => c.split(",").map(s => s.trim()).filter(Boolean));
  const tickers = url.searchParams.getAll("ticker").flatMap(c => c.split(",").map(s => s.trim()).filter(Boolean));

  console.log("Clients:", clients);
  console.log("Tickers:", tickers);

  // Dummy data
  const allTrades = [
    { id: "1", client: "AAA001", ticker: "RELIANCE", side: "Buy", product: "CNC", ex_qty: 50, total_qty: 100, price: 200, time: "2025-06-12T12:00:00Z" },
    { id: "2", client: "AAA003", ticker: "MRF", side: "Buy", product: "NRML", ex_qty: 10, total_qty: 20, price: 3000, time: "2025-06-12T12:05:00Z" },
    { id: "3", client: "AAA002", ticker: "ASIANPAINT", side: "Buy", product: "NRML", ex_qty: 10, total_qty: 30, price: 320, time: "2025-06-12T12:10:00Z" },
    { id: "4", client: "AAA002", ticker: "TATAINVEST", side: "Sell", product: "INTRADAY", ex_qty: 10, total_qty: 10, price: 320, time: "2025-06-12T12:10:00Z" },
    {
      id: "5",
      client: "AAA002",
      ticker: "TCS",
      side: "Sell",
      product: "INTRADAY",
      ex_qty: 30,
      total_qty: 60,
      price: 312,
      time: "2025-06-12T13:20:00Z"
    },
    {
      id: "6",
      client: "AAA001",
      ticker: "INFY",
      side: "Buy",
      product: "CNC",
      ex_qty: 5,
      total_qty: 15,
      price: 1450,
      time: "2025-06-12T14:15:00Z",
    },
    {
      id: "7",
      client: "AAA003",
      ticker: "HDFCBANK",
      side: "Sell",
      product: "NRML",
      ex_qty: 25,
      total_qty: 40,
      price: 1640,
      time: "2025-06-12T11:45:00Z",
    },
    {
      id: "8",
      client: "AAA001",
      ticker: "ITC",
      side: "Buy",
      product: "CNC",
      ex_qty: 20,
      total_qty: 50,
      price: 460,
      time: "2025-06-12T09:50:00Z",
    },
    {
      id: "9",
      client: "AAA003",
      ticker: "SUNPHARMA",
      side: "Sell",
      product: "INTRADAY",
      ex_qty: 15,
      total_qty: 30,
      price: 1020,
      time: "2025-06-12T10:30:00Z",
    },
    {
      id: "10",
      client: "AAA002",
      ticker: "ADANIENT",
      side: "Buy",
      product: "NRML",
      ex_qty: 12,
      total_qty: 25,
      price: 2900,
      time: "2025-06-12T15:10:00Z",
    },
  ];

  // Filter trades based on query params
  const filtered = allTrades.filter(trade => {
    const clientMatch = clients.length === 0 || clients.includes(trade.client);
    // const tickerMatch = tickers.length === 0 || tickers.includes(trade.ticker);
    return clientMatch;
    // return clientMatch && tickerMatch;
  });

  return NextResponse.json(filtered);
}

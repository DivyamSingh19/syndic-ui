"use client";
import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Search } from "lucide-react";

type Txn = {
  id: number;
  type: "sent" | "received";
  description: string;
  amount: number;
  date: string; // ISO
  status: "completed" | "pending" | "failed";
  reference: string;
  contact: string;
  method: "UPI" | "Card" | "Wallet" | "Bank";
};

const PastTransactions = () => {
  const data: Txn[] = useMemo(
    () => [
      {
        id: 1,
        type: "received",
        description: "Payment from Rajesh Kumar",
        amount: 1250,
        date: "2025-09-20T10:12:00Z",
        status: "completed",
        reference: "INV-23901",
        contact: "Rajesh Kumar",
        method: "UPI",
      },
      {
        id: 2,
        type: "sent",
        description: "Payment to Flipkart",
        amount: 850,
        date: "2025-09-19T08:34:00Z",
        status: "pending",
        reference: "BILL-88421",
        contact: "Flipkart",
        method: "Bank",
      },
      {
        id: 3,
        type: "sent",
        description: "Subscription to Hotstar",
        amount: 499,
        date: "2025-09-19T06:02:00Z",
        status: "completed",
        reference: "SUB-77231",
        contact: "Hotstar",
        method: "Card",
      },
      {
        id: 4,
        type: "received",
        description: "Refund from Amazon India",
        amount: 300,
        date: "2025-09-18T13:50:00Z",
        status: "completed",
        reference: "RFD-40211",
        contact: "Amazon India",
        method: "Wallet",
      },
      {
        id: 5,
        type: "sent",
        description: "Electricity Bill Payment",
        amount: 1200,
        date: "2025-09-17T11:20:00Z",
        status: "completed",
        reference: "BILL-90012",
        contact: "BSES Delhi",
        method: "UPI",
      },
      {
        id: 6,
        type: "received",
        description: "Salary Credited",
        amount: 75000,
        date: "2025-09-15T09:00:00Z",
        status: "completed",
        reference: "SAL-2025",
        contact: "Infosys Ltd",
        method: "Bank",
      },
      {
        id: 7,
        type: "sent",
        description: "Payment to Zomato",
        amount: 450,
        date: "2025-09-21T20:30:00Z",
        status: "completed",
        reference: "ORD-11234",
        contact: "Zomato",
        method: "UPI",
      },
      {
        id: 8,
        type: "sent",
        description: "Mobile Recharge",
        amount: 299,
        date: "2025-09-16T15:00:00Z",
        status: "failed",
        reference: "RCH-55678",
        contact: "Jio",
        method: "Wallet",
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Txn | null>(null);
  const [quickRange, setQuickRange] = useState<"7d" | "30d" | "custom" | null>(
    "7d"
  );
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [type, setType] = useState<"all" | "sent" | "received">("all");
  const [status, setStatus] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");
  const [method, setMethod] = useState<
    "all" | "UPI" | "Card" | "Wallet" | "Bank"
  >("all");
  const [minAmt, setMinAmt] = useState<string>("");
  const [maxAmt, setMaxAmt] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const now = new Date();
    let start: Date | null = null;
    if (quickRange === "7d")
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (quickRange === "30d")
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    if (quickRange === "custom") start = from ? new Date(from) : null;
    const end = quickRange === "custom" && to ? new Date(to) : now;

    return data.filter((t) => {
      const dt = new Date(t.date);
      if (start && dt < start) return false;
      if (end && dt > end) return false;
      if (type !== "all" && t.type !== type) return false;
      if (status !== "all" && t.status !== status) return false;
      if (method !== "all" && t.method !== method) return false;
      const min = minAmt ? Number(minAmt) : null;
      const max = maxAmt ? Number(maxAmt) : null;
      if (min !== null && t.amount < min) return false;
      if (max !== null && t.amount > max) return false;
      const q = query.trim().toLowerCase();
      if (q) {
        const hay =
          `${t.contact} ${t.description} ${t.reference}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, quickRange, from, to, type, status, method, minAmt, maxAmt, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const formatAmountINR = (n: number, t: Txn["type"]) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(n);
    return `${t === "received" ? "+" : "-"}${formatted}`;
  };

  const formatDMY = (iso: string) => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          Transaction History
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={quickRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setQuickRange("7d")}
          >
            Last 7 days
          </Button>
          <Button
            variant={quickRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setQuickRange("30d")}
          >
            Last 30 days
          </Button>
          <Button
            variant={quickRange === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => setQuickRange("custom")}
          >
            Custom
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-lg border p-4 grid gap-4 bg-[#17181c] flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by contact, description, or reference..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="from">From Date</Label>
            <div className="relative">
              <Input
                id="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                ref={fromRef}
                className="pr-8 custom-date"
              />
              <CalendarIcon
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => fromRef.current?.showPicker?.()}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To Date</Label>
            <div className="relative">
              <Input
                id="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                ref={toRef}
                className="pr-8 custom-date"
              />
              <CalendarIcon
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => toRef.current?.showPicker?.()}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Method</Label>
            <Select value={method} onValueChange={(v: any) => setMethod(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Wallet">Wallet</SelectItem>
                <SelectItem value="Bank">Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table - UPDATED SECTION */}
      <div className="rounded-lg border bg-[#17181c] flex-1 overflow-auto relative">
        <Table>
          <TableHeader>
            {/* The sticky class keeps the header fixed to the top of the scroll container */}
            <TableRow className="sticky top-0 z-10 bg-[#17181c] hover:bg-[#17181c]">
              <TableHead className="w-[80px]">Sr No</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Transaction Details</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length > 0 ? (
              pageData.map((t, idx) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">
                    {(page - 1) * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>{formatDMY(t.date)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{t.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.contact}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{t.type}</TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      t.type === "received"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {formatAmountINR(t.amount, t.type)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        t.status === "completed"
                          ? "default"
                          : t.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell>
                    <Dialog onOpenChange={(open) => !open && setSelected(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(t)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                          <DialogDescription>
                            Detailed information for this transaction.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 text-sm py-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Reference ID
                            </span>
                            <span>{selected?.reference}</span>
                          </div>
                          {/* Add other details similarly */}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Amount
                            </span>
                            <span>
                              {selected
                                ? formatAmountINR(
                                    selected.amount,
                                    selected.type
                                  )
                                : ""}
                            </span>
                          </div>
                          {/* ... more details ... */}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <style jsx global>{`
        input[type="date"].custom-date::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        input[type="date"].custom-date {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default PastTransactions;

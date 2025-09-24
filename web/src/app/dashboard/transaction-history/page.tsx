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
import { Calendar } from "lucide-react";

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
        description: "Payment from John Doe",
        amount: 1250,
        date: "2025-09-20T10:12:00Z",
        status: "completed",
        reference: "INV-23901",
        contact: "John Doe",
        method: "UPI",
      },
      {
        id: 2,
        type: "sent",
        description: "Payment to TechCorp",
        amount: 850,
        date: "2025-09-19T08:34:00Z",
        status: "pending",
        reference: "BILL-88421",
        contact: "TechCorp",
        method: "Bank",
      },
      {
        id: 3,
        type: "sent",
        description: "Subscription to Streamio",
        amount: 19,
        date: "2025-09-19T06:02:00Z",
        status: "completed",
        reference: "SUB-77231",
        contact: "Streamio",
        method: "Card",
      },
      {
        id: 4,
        type: "received",
        description: "Refund from ACME",
        amount: 300,
        date: "2025-09-18T13:50:00Z",
        status: "completed",
        reference: "RFD-40211",
        contact: "ACME",
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
    <div className="h-full p-6 space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-6xl font-semibold">Transaction History</h1>
        <div className="inline-flex gap-2">
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
      <div className="rounded-md border p-4 grid grid-cols-1 gap-4">
        <div className="w-full">
          <Label>Search</Label>
          <Input
            placeholder="Search by contact, description, or reference"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {/* Date range group */}
          <div className="flex items-end gap-3">
            <div className="grid gap-1 relative">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                ref={fromRef}
                className="pr-8 custom-date"
              />
              <Calendar
                className="absolute right-2 bottom-2 h-4 w-4 text-white cursor-pointer"
                onClick={() => {
                  const el = fromRef.current as any;
                  if (el?.showPicker) el.showPicker();
                  else el?.focus();
                }}
              />
            </div>
            <div className="grid gap-1 relative">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                ref={toRef}
                className="pr-8 custom-date"
              />
              <Calendar
                className="absolute right-2 bottom-2 h-4 w-4 text-white cursor-pointer"
                onClick={() => {
                  const el = toRef.current as any;
                  if (el?.showPicker) el.showPicker();
                  else el?.focus();
                }}
              />
            </div>
          </div>
          {/* Type/Status/Method group */}
          <div className="flex items-end gap-3 flex-wrap">
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Method</Label>
              <Select value={method} onValueChange={(v: any) => setMethod(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
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
          {/* Min/Max group at end */}
          <div className="flex items-end gap-3 ml-auto">
            <div className="grid gap-1">
              <Label htmlFor="min">Min</Label>
              <Input
                id="min"
                type="number"
                value={minAmt}
                onChange={(e) => setMinAmt(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="max">Max</Label>
              <Input
                id="max"
                type="number"
                value={maxAmt}
                onChange={(e) => setMaxAmt(e.target.value)}
                placeholder="1000"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Sr No</TableHead>
              <TableHead>Date & time</TableHead>
              <TableHead>TransactionDetails</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="w-[110px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((t, idx) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">
                  {(page - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell>{formatDMY(t.date)}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{t.description}</span>
                    <span className="text-xs text-muted-foreground">
                      {t.contact}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{t.type}</TableCell>
                <TableCell
                  className={`text-right ${
                    t.type === "received" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {formatAmountINR(t.amount, t.type)}
                </TableCell>
                <TableCell className="capitalize">
                  <Badge
                    variant={t.status === "completed" ? "default" : "secondary"}
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
                      <div className="grid gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Reference
                          </span>
                          <span className="font-medium">
                            {selected?.reference}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Contact</span>
                          <span>{selected?.contact}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span className="capitalize">{selected?.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span>
                            {selected?.type === "received" ? "+" : "-"}$
                            {selected?.amount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span>
                            {selected ? formatDMY(selected.date) : ""}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <Badge
                            variant={
                              selected?.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selected?.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Method</span>
                          <span>{selected?.method}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Description
                          </span>
                          <p className="mt-1">{selected?.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
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
      {/* Hide native date picker icon and keep white icon clickable */}
      <style jsx global>{`
        input[type="date"].custom-date::-webkit-calendar-picker-indicator {
          opacity: 0;
          display: none;
        }
        input[type="date"].custom-date {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default PastTransactions;

/* Hide native calendar indicator so only the white icon shows */
/* styled-jsx global to affect shadcn Input under this page */
<style jsx global>{`
  input[type="date"].custom-date::-webkit-calendar-picker-indicator {
    opacity: 0;
    display: none;
  }
  input[type="date"].custom-date {
    color-scheme: dark;
  }
`}</style>;

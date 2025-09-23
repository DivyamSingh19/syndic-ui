"use client";

import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Copy, Headphones } from "lucide-react";

type FailedTxn = {
  reference: string;
  date: string; // ISO
  recipient: string;
  amount: number;
  method: "UPI" | "Card" | "Wallet" | "Bank";
  reason:
    | "Insufficient balance"
    | "Network error"
    | "Invalid UPI ID"
    | "Card declined"
    | "Expired";
  status: "failed" | "declined" | "expired";
};

const FailedTransactions = () => {
  const data: FailedTxn[] = useMemo(
    () => [
      {
        id: "1",
        reference: "REF-11223",
        date: "2025-09-20T12:10:00Z",
        recipient: "TechCorp",
        amount: 849,
        method: "Bank",
        reason: "Insufficient balance",
        status: "failed",
      },
      {
        id: "2",
        reference: "REF-77821",
        date: "2025-09-19T09:40:00Z",
        recipient: "John Doe",
        amount: 1200,
        method: "UPI",
        reason: "Network error",
        status: "declined",
      },
      {
        id: "3",
        reference: "REF-33451",
        date: "2025-09-18T08:05:00Z",
        recipient: "ACME",
        amount: 300,
        method: "Card",
        reason: "Card declined",
        status: "failed",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [reason, setReason] = useState<
    | "all"
    | "Insufficient balance"
    | "Network error"
    | "Invalid UPI ID"
    | "Card declined"
    | "Expired"
  >("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [minAmt, setMinAmt] = useState("");
  const [maxAmt, setMaxAmt] = useState("");
  const [selected, setSelected] = useState<FailedTxn | null>(null);
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return data.filter((t) => {
      const q = query.trim().toLowerCase();
      if (q && !t.recipient.toLowerCase().includes(q)) return false;
      if (reason !== "all" && t.reason !== reason) return false;
      const dt = new Date(t.date);
      if (from && dt < new Date(from)) return false;
      if (to && dt > new Date(to)) return false;
      const min = minAmt ? Number(minAmt) : null;
      const max = maxAmt ? Number(maxAmt) : null;
      if (min !== null && t.amount < min) return false;
      if (max !== null && t.amount > max) return false;
      return true;
    });
  }, [data, query, reason, from, to, minAmt, maxAmt]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n);
  const dmy = (iso: string) => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  };

  const empty = filtered.length === 0;
  const last30 = data.filter(
    (t) => new Date(t.date) >= new Date(Date.now() - 30 * 86400000)
  ).length;
  const topReason = Object.entries(
    data.reduce<Record<string, number>>((acc, t) => {
      acc[t.reason] = (acc[t.reason] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="h-full p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-6xl font-semibold">Failed Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Only unsuccessful payments are shown.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-md border p-4 grid grid-cols-1 gap-4">
        {/* Row 1: Search */}
        <div className="w-full">
          <Label>Search</Label>
          <Input
            placeholder="Search by recipient"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Row 2: Groups */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Date range */}
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

          {/* Reason */}
          <div>
            <Label>Failure reason</Label>
            <Select value={reason} onValueChange={(v: any) => setReason(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Insufficient balance">
                  Insufficient balance
                </SelectItem>
                <SelectItem value="Network error">Network error</SelectItem>
                <SelectItem value="Invalid UPI ID">Invalid UPI ID</SelectItem>
                <SelectItem value="Card declined">Card declined</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min/Max */}
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

      {/* Empty state */}
      {empty ? (
        <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
          No failed transactions recently.
        </div>
      ) : (
        <div className="rounded-md border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & time</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="text-right">Amount attempted</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.reference}>
                  <TableCell>{dmy(t.date)}</TableCell>
                  <TableCell>{t.recipient}</TableCell>
                  <TableCell className="text-right">{inr(t.amount)}</TableCell>
                  <TableCell>{t.reason}</TableCell>
                  <TableCell className="capitalize">
                    <Badge variant="destructive">{t.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Dialog
                        onOpenChange={(open) => !open && setSelected(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelected(t)}
                          >
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Failure details</DialogTitle>
                            <DialogDescription>
                              What happened and how to fix it.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Date
                              </span>
                              <span>{selected ? dmy(selected.date) : ""}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Recipient
                              </span>
                              <span>{selected?.recipient}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Amount
                              </span>
                              <span>
                                {selected ? inr(selected.amount) : ""}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Method
                              </span>
                              <span>{selected?.method}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Reason
                              </span>
                              <span>{selected?.reason}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Suggested next steps
                              </span>
                              <ul className="mt-1 list-disc pl-5">
                                <li>Retry now</li>
                                <li>
                                  If card declined: update card or contact bank
                                </li>
                                <li>
                                  If network error: try again in a few minutes
                                </li>
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* Pagination */}
      <div className="flex items-center justify-between ">
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

      {/* Hide native indicator for date inputs */}
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

export default FailedTransactions;

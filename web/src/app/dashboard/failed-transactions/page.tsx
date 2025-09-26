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
import { Calendar as CalendarIcon, Search } from "lucide-react";

type FailedTxn = {
  id: string;
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
        recipient: "ACME Inc.",
        amount: 300,
        method: "Card",
        reason: "Card declined",
        status: "failed",
      },
      {
        id: "4",
        reference: "REF-99876",
        date: "2025-09-17T15:20:00Z",
        recipient: "Jane Smith",
        amount: 5000,
        method: "UPI",
        reason: "Invalid UPI ID",
        status: "failed",
      },

    ],
    []
  );

  const [query, setQuery] = useState("");
  const [reason, setReason] = useState<any>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<FailedTxn | null>(null);
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return data.filter((t) => {
      const q = query.trim().toLowerCase();
      if (
        q &&
        !t.recipient.toLowerCase().includes(q) &&
        !t.reference.toLowerCase().includes(q)
      )
        return false;
      if (reason !== "all" && t.reason !== reason) return false;
      const dt = new Date(t.date);
      if (from && dt < new Date(from)) return false;
      if (to && dt > new Date(to)) return false;
      return true;
    });
  }, [data, query, reason, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n);

  const dmy = (iso: string) => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()} ${String(d.getHours()).padStart(
      2,
      "0"
    )}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          Failed Transactions
        </h1>
        <p className="text-sm text-muted-foreground">
          Review and manage all unsuccessful payments.
        </p>
      </div>

      <div className="rounded-lg border p-4 grid gap-4 bg-[#17181c] flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by recipient or reference ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label>Failure Reason</Label>
            <Select value={reason} onValueChange={(v) => setReason(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
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
        </div>
      </div>

      <div className="rounded-lg border bg-[#17181c] flex-1 overflow-auto relative">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-[#17181c] hover:bg-[#17181c]">
              <TableHead>Date & Time</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason & Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length > 0 ? (
              pageData.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{dmy(t.date)}</TableCell>
                  <TableCell className="font-medium">{t.recipient}</TableCell>
                  <TableCell>{inr(t.amount)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{t.reason}</span>
                      {/* Restored colorful status badges */}
                      <Badge
                        variant={
                          t.status === "failed"
                            ? "destructive"
                            : t.status === "declined"
                            ? "secondary"
                            : "outline"
                        }
                        className="capitalize w-fit"
                      >
                        {t.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* Restored original Action column */}
                    <Dialog onOpenChange={(open) => !open && setSelected(null)}>
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
                          <DialogTitle>Failure Details</DialogTitle>
                          <DialogDescription>
                            What happened and how to fix it.
                          </DialogDescription>
                        </DialogHeader>
                        {/* Original simple modal content */}
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span>{selected ? dmy(selected.date) : ""}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Recipient
                            </span>
                            <span>{selected?.recipient}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No failed transactions match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between flex-shrink-0">
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

export default FailedTransactions;

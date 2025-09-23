"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

type Transaction = {
  id: number;
  type: "sent" | "received";
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
};

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: "Personal" | "Business" | "Family" | "Frequent";
};

export default function Dashboard() {
  const transactions: Transaction[] = useMemo(
    () => [
      {
        id: 1,
        type: "received",
        description: "Payment from John Doe",
        amount: 1250,
        date: "2025-09-20",
        status: "completed",
      },
      {
        id: 2,
        type: "sent",
        description: "Payment to TechCorp",
        amount: 850,
        date: "2025-09-19",
        status: "pending",
      },
      {
        id: 3,
        type: "received",
        description: "Refund from ACME",
        amount: 300,
        date: "2025-09-18",
        status: "completed",
      },
      {
        id: 4,
        type: "sent",
        description: "Payment to CleanPro",
        amount: 120,
        date: "2025-09-17",
        status: "completed",
      },
      {
        id: 5,
        type: "received",
        description: "Payment from Sarah",
        amount: 540,
        date: "2025-09-16",
        status: "completed",
      },
    ],
    []
  );

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      type: "Frequent",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1234567891",
      type: "Personal",
    },
    {
      id: 3,
      name: "TechCorp Services",
      email: "support@techcorp.com",
      phone: "+1234567892",
      type: "Business",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Contact, "id">>({
    name: "",
    email: "",
    phone: "",
    type: "Personal",
  });

  const addContact = () => {
    if (!form.name || !form.email) return;
    setContacts((prev) => [...prev, { id: prev.length + 1, ...form }]);
    setForm({ name: "", email: "", phone: "", type: "Personal" });
    setOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-background p-6">
      <div className="grid h-full grid-cols-12 grid-rows-2 gap-6">
        {/* Top row */}
        <Card className="col-span-12 md:col-span-4 lg:col-span-3 row-span-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Latest activity at a glance</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {t.description}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t.date}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      {t.type === "received" ? "+" : "-"}${t.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-8 lg:col-span-9 row-span-1 h-full flex flex-col">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Add contact</CardTitle>
              <CardDescription>Create a new payee</CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add contact</DialogTitle>
                  <DialogDescription>
                    Save a payee for quicker transfers.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+1234567890"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v: Contact["type"]) =>
                        setForm({ ...form, type: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Frequent">Frequent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addContact}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="w-[120px]">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.phone}</TableCell>
                      <TableCell>{c.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom row */}
        <Card className="col-span-12 lg:col-span-6 row-span-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>People and businesses you pay</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-6 row-span-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">Send money</Button>
            <Button variant="outline" className="w-full justify-start">
              Request money
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View history
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Add funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { PlusCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";

type Transaction = {
  id: number;
  type: "sent" | "received";
  description: string;
  amount: number;
  date: string;
};
type Contact = { id: number; name: string; username: string; avatar: string };
type FullContact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: "Personal" | "Business" | "Family" | "Frequent";
};

const chartData = [
  { day: "Mon", transactions: 1200 },
  { day: "Tue", transactions: 1850 },
  { day: "Wed", transactions: 1600 },
  { day: "Thu", transactions: 2100 },
  { day: "Fri", transactions: 1750 },
  { day: "Sat", transactions: 2000 },
  { day: "Sun", transactions: 1500 },
];

export default function Dashboard() {
  const router = useRouter();
  const transactions: Transaction[] = useMemo(
    () => [
      {
        id: 1,
        type: "sent",
        description: "Paid to Reliance Digital",
        amount: 2999.0,
        date: "Sept 20, 2025",
      },
      {
        id: 2,
        type: "received",
        description: "Salary from Infosys",
        amount: 75000.0,
        date: "Sept 19, 2025",
      },
      {
        id: 3,
        type: "sent",
        description: "Amazon India Purchase",
        amount: 1599.0,
        date: "Sept 18, 2025",
      },
    ],
    []
  );

  const contacts: Contact[] = useMemo(
    () => [
      {
        id: 1,
        name: "Arjun Mehta",
        username: "@arjunm",
        avatar: "/avatars/01.png",
      },
      {
        id: 2,
        name: "Priya Sharma",
        username: "@priyash",
        avatar: "/avatars/02.png",
      },
      {
        id: 3,
        name: "Rohit Singh",
        username: "@rohits",
        avatar: "/avatars/03.png",
      },
    ],
    []
  );

  const [allContacts, setAllContacts] = useState<FullContact[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<FullContact, "id">>({
    name: "",
    email: "",
    phone: "",
    type: "Personal",
  });

  const addContact = () => {
    if (!form.name || !form.email) return;
    setAllContacts((prev) => [...prev, { id: prev.length + 1, ...form }]);
    setForm({ name: "", email: "", phone: "", type: "Personal" });
    setOpen(false);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-gray-50 flex flex-col">
      <main className="flex-1 min-h-0 p-6 pt-4">
        <div className="grid grid-rows-2 grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Analytics Card */}
          <Card className="lg:col-span-2 bg-[#17181c] border-gray-800 flex flex-col h-72">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-gray-50">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pl-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(128, 128, 128, 0.1)" }}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                    }}
                  />
                  <Bar
                    dataKey="transactions"
                    fill="hsl(142.1 76.2% 41.2%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Contacts Card */}
          <Card className="bg-[#17181c] border-gray-800 flex flex-col h-72">
            <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between">
              <CardTitle className="text-gray-50">Contacts</CardTitle>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#17181c] border-gray-800 text-gray-50">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
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
                        className="bg-gray-800 border-gray-700"
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
                        className="bg-gray-800 border-gray-700"
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
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Type</Label>
                      <Select
                        value={form.type}
                        onValueChange={(v: FullContact["type"]) =>
                          setForm({ ...form, type: v })
                        }
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-50">
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
                    <Button
                      onClick={addContact}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-400">
                          {contact.username}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 h-7"
                    >
                      Send
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="link"
                className="text-blue-400 mt-2 p-0 h-auto self-start"
              >
                View All Contacts
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions Card */}
          <Card className="lg:col-span-2 bg-[#17181c] border-gray-800 h-72">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-50">
                Recent Transactions
              </CardTitle>
              <Button variant="link" className="text-blue-400">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          t.type === "sent"
                            ? "bg-blue-500/20"
                            : "bg-green-500/20"
                        }`}
                      >
                        {t.type === "sent" ? (
                          <ArrowUp className="h-5 w-5 text-blue-400" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{t.description}</p>
                        <p className="text-sm text-gray-400">{t.date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        t.type === "received"
                          ? "text-green-400"
                          : "text-gray-50"
                      }`}
                    >
                      {t.type === "received" ? "+" : "-"}₹{t.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Card */}
          <Card className="bg-[#061622] border-0 p-4 min-h-[120px] lg:min-h-[160px] justify-center items-center">
            <CardTitle className="text-white text-lg">
              Need to pay someone?
            </CardTitle>
            <CardDescription className="text-cyan-100 my-2 text-sm text-center">
              Initiate a new transfer or set up a recurring payment.
            </CardDescription>
            <Button
              className="mt-2 w-1/2 bg-gray-50 text-gray-900 font-bold hover:bg-gray-200 h-10"
              onClick={() => router.push("/dashboard/create-transaction/step-1")}
            >
              Start New Payment
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}

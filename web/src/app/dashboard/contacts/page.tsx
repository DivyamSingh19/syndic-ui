"use client";
import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Trash2, UserPlus, FilePenLine } from "lucide-react";
import PhoneCodeSelector from "@/components/ui-elements/selectors/PhoneCodeSelector";

// --- TYPE DEFINITION ---
interface Friend {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  type?: "Close Friend" | "Acquaintance";
  favorite: boolean;
  notes?: string;
}

// --- MOCK DATA ---
const initialFriends: Friend[] = [
  {
    id: 1,
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 9876543210",
    type: "Close Friend",
    favorite: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 9123456789",
    type: "Acquaintance",
    favorite: false,
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 9988776655",
    type: "Acquaintance",
    favorite: false,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 9234567890",
    type: "Close Friend",
    favorite: false,
  },
];

// --- FRIEND FORM COMPONENT ---
interface FriendFormProps {
  onSubmit: (data: Omit<Friend, "id" | "favorite">) => void;
  onClose: () => void;
  initialData?: Partial<Friend>;
}

const FriendForm = ({
  onSubmit,
  onClose,
  initialData = {},
}: FriendFormProps) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone?.split(" ")[1] || "",
    phoneCode: initialData.phone?.split(" ")[0] || "+91",
    type: initialData.type || "Close Friend",
    notes: initialData.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    onSubmit({
      ...form,
      phone: `${form.phoneCode} ${form.phone}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <div className="flex gap-2">
          <PhoneCodeSelector
            value={form.phoneCode}
            onValueChange={(value: string) =>
              setForm({ ...form, phoneCode: value.split("-")[0] })
            }
          />
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={form.type}
          onValueChange={(value) => setForm({ ...form, type: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Close Friend">Close Friend</SelectItem>
            <SelectItem value="Acquaintance">Acquaintance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Save Contact</Button>
      </DialogFooter>
    </form>
  );
};

// --- MAIN CONTACTS COMPONENT ---
const Contacts = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [search, setSearch] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredFriends = friends.filter((f) => {
    const searchLower = search.toLowerCase();
    return search
      ? f.name.toLowerCase().includes(searchLower) ||
          (f.email && f.email.toLowerCase().includes(searchLower))
      : true;
  });

  const handleAddFriend = (data: Omit<Friend, "id" | "favorite">) => {
    setFriends([...friends, { ...data, id: Date.now(), favorite: false }]);
    setDialogOpen(false);
  };

  const handleEditFriend = (data: Omit<Friend, "id" | "favorite">) => {
    setFriends(
      friends.map((f) => (f.id === selectedFriend?.id ? { ...f, ...data } : f))
    );
    setDialogOpen(false);
  };

  const deleteFriend = (id: number) =>
    setFriends(friends.filter((f) => f.id !== id));

  const openDialog = (friend: Friend | null) => {
    setSelectedFriend(friend);
    setDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog(null)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedFriend ? "Edit Contact" : "Add New Contact"}
              </DialogTitle>
            </DialogHeader>
            <FriendForm
              onSubmit={selectedFriend ? handleEditFriend : handleAddFriend}
              initialData={selectedFriend || {}}
              onClose={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative flex-shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg  border bg-[#17181c] flex-1 relative overflow-auto max-h-[calc(100vh-220px)]">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-[#17181c] hover:bg-[#17181c]">
              <TableHead className="w-[60px] text-center">Sr No</TableHead>
              <TableHead className="w-[35%]">Name</TableHead>
              <TableHead className="w-[45%]">Email</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, idx) => (
                <TableRow key={friend.id}>
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {friend.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium truncate">
                        {friend.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground truncate">
                    {friend.email || "N/A"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openDialog(friend)}
                    >
                      <FilePenLine className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-400"
                      onClick={() => deleteFriend(friend.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No contacts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Contacts;

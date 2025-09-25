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
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import PhoneCodeSelector from "@/components/ui-elements/selectors/PhoneCodeSelector";

// Define Friend type
interface Friend {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  type?: "Close Friend" | "Acquaintance";
  lastConnected?: string;
  favorite: boolean;
  notes?: string;
}

const initialFriends: Friend[] = [
  { id: 1, name: "Alice Lee", favorite: false },
  { id: 2, name: "Bob Johnson", favorite: false },
];

// Friend form with PhoneCodeSelector
interface FriendFormProps {
  onSubmit: (data: Omit<Friend, "id" | "favorite" | "lastConnected">) => void;
  initialData?: Partial<Friend>;
}

const FriendForm = ({ onSubmit, initialData = {} }: FriendFormProps) => {
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
    onSubmit({
      ...form,
      phone: `${form.phoneCode} ${form.phone}`,
    });
  };

  return (
    <div className="space-y-4">
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
          onValueChange={(value) =>
            setForm({ ...form, type: value as "Close Friend" | "Acquaintance" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Close Friend">Close Friend</SelectItem>
            <SelectItem value="Acquaintance">Acquaintance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Save Friend
      </Button>
    </div>
  );
};

// Contacts component
const Contacts = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = friends.filter((f) => {
    let matches = true;
    if (search) {
      matches =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        (f.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (f.phone?.toLowerCase().includes(search.toLowerCase()) ?? false);
    }
    if (filter === "Favorites") {
      matches = matches && f.favorite;
    } else if (filter !== "All") {
      matches = matches && f.type === filter;
    }
    return matches;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleAddFriend = (
    data: Omit<Friend, "id" | "favorite" | "lastConnected">
  ) => {
    setFriends([
      ...friends,
      {
        ...data,
        id: Date.now(),
        favorite: false,
        lastConnected: new Date().toISOString().slice(0, 10),
      },
    ]);
    setDialogOpen(false);
    setSelectedFriend(null);
    setPage(1);
  };

  const handleEditFriend = (
    data: Omit<Friend, "id" | "favorite" | "lastConnected">
  ) => {
    setFriends(
      friends.map((f) =>
        f.id === selectedFriend?.id ? ({ ...f, ...data } as Friend) : f
      )
    );
    setDialogOpen(false);
    setSelectedFriend(null);
  };

  const deleteFriend = (friend: Friend) =>
    setFriends(friends.filter((f) => f.id !== friend.id));

  const openAddDialog = () => {
    setSelectedFriend(null);
    setDialogOpen(true);
  };

  const openEditDialog = (friend: Friend) => {
    setSelectedFriend(friend);
    setDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-6xl font-semibold">Contacts</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedFriend ? "Edit Friend" : "Add Friend"}
              </DialogTitle>
            </DialogHeader>
            <FriendForm
              onSubmit={selectedFriend ? handleEditFriend : handleAddFriend}
              initialData={selectedFriend || {}}
            />
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Close Friend">Close Friends</SelectItem>
            <SelectItem value="Acquaintance">Acquaintances</SelectItem>
            <SelectItem value="Favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {pageData.map((friend) => (
          <Card key={friend.id} className="w-full">
            <CardContent className="flex justify-between items-center">
              <span>{friend.name}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(friend)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteFriend(friend)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {pageData.length === 0 && (
          <Card>
            <CardContent className="text-center text-muted-foreground">
              No friends found.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

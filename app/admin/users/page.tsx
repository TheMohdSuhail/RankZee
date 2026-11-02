"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UserItem {
  id: string;
  uid: string;
  name: string;
  email: string;
  role: "user" | "admin";
  disabled?: boolean;
  createdAt: any;
  lastLogin: any;
}

export default function AdminUsersPage() {
  const { success } = useToast();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      if (!snap.empty) {
        const list: UserItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setUsers(list);
      } else {
        setUsers([
          {
            id: "user-1",
            uid: "uid_admin_owner",
            name: "RankZee Owner",
            email: "admin@rankzee.com",
            role: "admin",
            disabled: false,
            createdAt: new Date("2025-01-10").toISOString(),
            lastLogin: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
    } catch {
      // optimistic
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole as any } : u))
    );
    success("Role Updated", `User role adjusted to ${newRole}`);
  };

  const handleToggleDisabled = async (userId: string, currentDisabled: boolean) => {
    const updated = !currentDisabled;
    try {
      await updateDoc(doc(db, "users", userId), { disabled: updated });
    } catch {
      // optimistic
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, disabled: updated } : u))
    );
    success(
      updated ? "User Disabled" : "User Enabled",
      updated ? "Access temporarily revoked." : "Account restored."
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Registered Accounts & Privileges
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Overview of internal team members and registered portal users.
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden bg-white border-slate-200 shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-600">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono font-semibold">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{u.name || "Unnamed"}</div>
                      <div className="text-[10px] text-slate-500 font-mono">UID: {u.uid?.slice(0, 10)}...</div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-700">{u.email}</td>

                    <td className="py-3 px-4">
                      <Badge variant={u.role === "admin" ? "neon" : "secondary"} className="text-[10px]">
                        {u.role === "admin" ? "Admin" : "Standard"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4">
                      {u.disabled ? (
                        <span className="text-[11px] text-rose-600 font-semibold">Disabled</span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold">Active</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-600">{formatDate(u.createdAt)}</td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRoleToggle(u.id, u.role)}
                          className="h-7 text-[11px]"
                        >
                          {u.role === "admin" ? "Demote to User" : "Make Admin"}
                        </Button>
                        <Button
                          size="sm"
                          variant={u.disabled ? "secondary" : "destructive"}
                          onClick={() => handleToggleDisabled(u.id, !!u.disabled)}
                          className="h-7 text-[11px]"
                        >
                          {u.disabled ? "Enable" : "Disable"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

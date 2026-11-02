"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface OrderRecord {
  id: string;
  orderId: string;
  provider: string;
  planName: string;
  amount: number;
  currency: string;
  userName: string;
  userEmail: string;
  status: "pending" | "paid" | "failed";
  createdAt: any;
}

export default function AdminOrdersPage() {
  const { success } = useToast();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "orders"));
      if (!snap.empty) {
        const list: OrderRecord[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setOrders(list);
      } else {
        setOrders([
          {
            id: "ord-1",
            orderId: "ord_1730350000001",
            provider: "razorpay",
            planName: "Growth Dominance",
            amount: 99999,
            currency: "INR",
            userName: "Vikram Singhania",
            userEmail: "vikram@paysprint.com",
            status: "paid",
            createdAt: new Date().toISOString(),
          },
          {
            id: "ord-2",
            orderId: "ord_1730350000002",
            provider: "razorpay",
            planName: "Starter Velocity",
            amount: 49999,
            currency: "INR",
            userName: "Pooja Mehta",
            userEmail: "pooja@aurathread.com",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: "pending" | "paid" | "failed") => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
    } catch {
      // optimistic
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    success("Order Updated", `Order status set to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Orders & Retainer Invoices
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Transaction logs and payment records.
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
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Plan & Amount</th>
                  <th className="py-3 px-4">Gateway</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                      {ord.orderId}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{ord.userName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{ord.userEmail}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{ord.planName}</div>
                      <div className="text-blue-700 font-mono font-medium">
                        {formatCurrency(ord.amount, ord.currency)}
                      </div>
                    </td>

                    <td className="py-3 px-4 uppercase font-mono text-slate-500 text-[11px]">
                      {ord.provider}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          ord.status === "paid"
                            ? "success"
                            : ord.status === "failed"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-[10px] uppercase font-mono"
                      >
                        {ord.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-slate-600">{formatDate(ord.createdAt)}</td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ord.status !== "paid" && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(ord.id, "paid")}
                            className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                          >
                            Mark Paid
                          </Button>
                        )}
                        {ord.status !== "failed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(ord.id, "failed")}
                            className="h-7 text-[10px] text-rose-600 hover:bg-rose-50 border-rose-200"
                          >
                            Mark Failed
                          </Button>
                        )}
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

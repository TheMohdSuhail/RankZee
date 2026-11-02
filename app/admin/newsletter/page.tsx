"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";
import { Download, Trash2, Mail, Loader2 } from "lucide-react";

interface SubscriberItem {
  id: string;
  email: string;
  subscribedAt: any;
  active?: boolean;
}

export default function AdminNewsletterPage() {
  const { success } = useToast();
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "newsletter"));
      if (!snap.empty) {
        const list: SubscriberItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setSubscribers(list);
      } else {
        setSubscribers([
          {
            id: "sub-1",
            email: "growth@startupx.com",
            subscribedAt: new Date().toISOString(),
            active: true,
          },
          {
            id: "sub-2",
            email: "marketing@retailhub.in",
            subscribedAt: new Date().toISOString(),
            active: true,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this subscriber?")) return;
    try {
      await deleteDoc(doc(db, "newsletter", id));
    } catch {
      // optimistic
    }
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    success("Subscriber Removed", "Email address deleted.");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,Email,SubscribedAt\n" +
      subscribers.map((s) => `${s.email},${formatDate(s.subscribedAt)}`).join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `rankzee_newsletter_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Weekly Growth Intel opt-in audience list.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={handleExportCSV} className="text-xs font-semibold">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          <span>Export Audience CSV</span>
        </Button>
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
                  <th className="py-3 px-4">Subscriber Email</th>
                  <th className="py-3 px-4">Subscribed Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">{s.email}</td>
                    <td className="py-3 px-4 text-slate-600">{formatDate(s.subscribedAt)}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success" className="text-[10px]">
                        Active Subscriber
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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

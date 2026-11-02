"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";
import { Mail, MailOpen, Trash2, Reply, Loader2 } from "lucide-react";

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: any;
}

export default function AdminMessagesPage() {
  const { success } = useToast();
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "contactMessages"));
      if (!snap.empty) {
        const list: ContactMessageItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setMessages(list);
        if (list.length > 0) setSelectedMessage(list[0]);
      } else {
        const demo: ContactMessageItem[] = [
          {
            id: "msg-1",
            name: "Harsh Goenka",
            email: "harsh@apexinfra.com",
            phone: "+91 98200 11223",
            subject: "Enterprise Next.js Web Overhaul & Technical SEO",
            message: "We have an existing website with 200+ subpages that is failing Core Web Vitals. We need a full Next.js migration and SEO preservation strategy.",
            read: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "msg-2",
            name: "Sanjana Roy",
            email: "sanjana@luxebeauty.co",
            phone: "+91 98300 44556",
            subject: "Creator Campaign + Meta Ads Retainer",
            message: "Looking for an agency that can handle both our creator sourcing and Advantage+ paid ad scaling. Can we set up a call?",
            read: true,
            createdAt: new Date().toISOString(),
          },
        ];
        setMessages(demo);
        setSelectedMessage(demo[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (msg: ContactMessageItem) => {
    const updated = !msg.read;
    try {
      await updateDoc(doc(db, "contactMessages", msg.id), { read: updated });
    } catch {
      // optimistic
    }
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: updated } : m)));
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, read: updated });
    }
    success("Status Updated", updated ? "Marked as read" : "Marked as unread");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this message?")) return;
    try {
      await deleteDoc(doc(db, "contactMessages", id));
    } catch {
      // optimistic
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(messages.find((m) => m.id !== id) || null);
    }
    success("Message Deleted", "Removed from inbox.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
          Contact Messages Inbox
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Review direct inquiries submitted through the contact page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        {/* Inbox List (Left Column) */}
        <Card className="lg:col-span-5 p-0 overflow-hidden flex flex-col bg-white border-slate-200 shadow-sm">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600 font-mono font-semibold">
            <span>Inbox ({messages.length})</span>
            <span className="text-blue-600">{messages.filter((m) => !m.read).length} Unread</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {loading ? (
              <div className="p-12 text-center text-slate-600">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
              </div>
            ) : (
              messages.map((m) => {
                const isSelected = selectedMessage?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMessage(m)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-50/70 border-l-4 border-blue-600"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs truncate max-w-[150px] ${!m.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {m.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatDate(m.createdAt)}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${!m.read ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                      {m.subject}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{m.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Message Viewer (Right Column) */}
        <Card className="lg:col-span-7 p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
          {selectedMessage ? (
            <>
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="font-semibold text-blue-700">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                      {selectedMessage.phone && <span>• {selectedMessage.phone}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReadStatus(selectedMessage)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title={selectedMessage.read ? "Mark Unread" : "Mark Read"}
                    >
                      {selectedMessage.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap py-4">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re:%20${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 text-xs transition-colors shadow-sm"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-slate-400">
              Select a message from the list to preview details.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

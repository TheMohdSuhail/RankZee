"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  Download,
  Trash2,
  MessageSquare,
  Mail,
  Loader2,
  FileText,
  Phone,
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes?: string[];
  createdAt: any;
}

const STATUS_OPTIONS = ["new", "contacted", "qualified", "converted", "lost"];

export default function AdminLeadsPage() {
  const { success, error } = useToast();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Notes Modal state
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "leads"));
      if (!snap.empty) {
        const list: LeadItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setLeads(list);
      } else {
        // Fallback default sample for initial state
        setLeads([
          {
            id: "lead-1",
            name: "Rahul Verma",
            email: "rahul@saascrm.com",
            phone: "+91 98123 45678",
            company: "SaaS CRM Solutions",
            service: "Search Engine Optimization (SEO)",
            budget: "₹1,50,000 - ₹3,00,000 / month",
            message: "Looking to scale commercial keywords for our B2B CRM product.",
            source: "home_page",
            status: "new",
            notes: ["Follow-up scheduled for Wednesday"],
            createdAt: new Date().toISOString(),
          },
          {
            id: "lead-2",
            name: "Meera Nair",
            email: "meera@organicskin.in",
            phone: "+91 98765 12345",
            company: "Aura Botanics",
            service: "Meta Ads (Facebook & Instagram)",
            budget: "₹80,000 - ₹1,50,000 / month",
            message: "Need help bringing down our Meta CAC from ₹420 to under ₹250.",
            source: "services_page",
            status: "contacted",
            notes: ["Sent ROAS breakdown via WhatsApp"],
            createdAt: new Date().toISOString(),
          },
          {
            id: "lead-3",
            name: "Vikram Singhania",
            email: "vikram@fintechloans.co",
            phone: "+91 98222 33445",
            company: "Fintech FastLoans",
            service: "Google Ads / PPC",
            budget: "₹3,00,000+ / month",
            message: "High intent loan search ads setup needed urgently.",
            source: "audit_tool",
            status: "qualified",
            notes: ["Booked 45-min audit call"],
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
    } catch {
      // optimistic update
    }
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
    );
    success("Status Updated", `Lead status changed to ${newStatus}.`);
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leads", id));
    } catch {
      // optimistic
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    success("Lead Removed", "The lead record has been deleted.");
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    setSavingNote(true);
    const noteText = `${new Date().toLocaleDateString("en-IN")}: ${newNote.trim()}`;
    try {
      await updateDoc(doc(db, "leads", selectedLead.id), {
        notes: arrayUnion(noteText),
      });
      const updatedNotes = [...(selectedLead.notes || []), noteText];
      setSelectedLead({ ...selectedLead, notes: updatedNotes });
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l))
      );
      setNewNote("");
      success("Note Recorded", "Internal note appended to lead.");
    } catch {
      const updatedNotes = [...(selectedLead.notes || []), noteText];
      setSelectedLead({ ...selectedLead, notes: updatedNotes });
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l))
      );
      setNewNote("");
    } finally {
      setSavingNote(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Source"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      l.email,
      l.phone,
      `"${l.company || ""}"`,
      `"${l.service}"`,
      `"${l.budget}"`,
      l.status,
      l.source,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rankzee_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Inbound Leads & Inquiries
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Qualify, inspect, and reply to client inquiries via WhatsApp, Phone, or Email.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={exportToCSV} className="text-xs">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by name, email, company, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          >
            <option value="all">All Statuses ({leads.length})</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                Status: {st.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="p-0 overflow-hidden bg-white border-slate-200 shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-600">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No leads match current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono font-semibold">
                  <th className="py-3 px-4">Lead</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Service & Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const whatsappClean = (lead.phone || "").replace(/[^0-9]/g, "");
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <div>{lead.name}</div>
                        {lead.company && (
                          <span className="text-[11px] text-slate-500 font-normal">
                            {lead.company}
                          </span>
                        )}
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                          Src: {lead.source}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-mono">{lead.email}</div>
                        <div className="text-[11px] text-slate-500">{lead.phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-blue-700 font-semibold block">{lead.service}</span>
                        <span className="text-slate-500 text-[11px]">{lead.budget}</span>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="h-7 px-2 rounded-md border border-slate-300 bg-white text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-blue-600 transition-colors font-medium"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>{lead.notes?.length || 0} notes</span>
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {whatsappClean && (
                            <a
                              href={`https://wa.me/${whatsappClean}?text=Hi%20${encodeURIComponent(
                                lead.name
                              )},%20this%20is%20RankZee%20Digital%20Marketing.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                              title="Call Lead"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}?subject=RankZee%20Digital%20Marketing%20Inquiry`}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Internal Notes Modal */}
      {selectedLead && (
        <Modal
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          title={`Internal Notes: ${selectedLead.name}`}
          description={`Client inquiry: "${selectedLead.message}"`}
        >
          <div className="space-y-4 pt-2">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {(!selectedLead.notes || selectedLead.notes.length === 0) && (
                <p className="text-xs text-slate-500 italic">No internal notes added yet.</p>
              )}
              {selectedLead.notes?.map((n, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  {n}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-200">
              <Input
                placeholder="Type note and hit Enter..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-xs h-9"
              />
              <Button type="submit" disabled={savingNote || !newNote.trim()} size="sm" className="w-full text-xs font-bold">
                {savingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Append Note"}
              </Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

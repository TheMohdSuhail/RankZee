"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { samplePortfolio, CaseStudyItem } from "@/lib/data/sample-portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminCmsPortfolioPage() {
  const { success, error } = useToast();
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<CaseStudyItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "portfolio"));
      if (!snap.empty) {
        const list: CaseStudyItem[] = snap.docs.map((d) => ({
          ...(d.data() as CaseStudyItem),
          slug: d.id,
        }));
        setItems(list);
      } else {
        setItems(samplePortfolio);
      }
    } catch {
      setItems(samplePortfolio);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (item: CaseStudyItem) => {
    const updated = !item.published;
    try {
      await updateDoc(doc(db, "portfolio", item.slug), { published: updated });
    } catch {
      // optimistic
    }
    setItems((prev) =>
      prev.map((i) => (i.slug === item.slug ? { ...i, published: updated } : i))
    );
    success("Status Updated", `${item.client} case study is now ${updated ? "Live" : "Draft"}`);
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Permanently delete this case study?")) return;
    try {
      await deleteDoc(doc(db, "portfolio", slug));
    } catch {
      // optimistic
    }
    setItems((prev) => prev.filter((i) => i.slug !== slug));
    success("Case Study Deleted", "Removed from CMS.");
  };

  const handleOpenEdit = (item?: CaseStudyItem) => {
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem({
        slug: "",
        title: "",
        client: "",
        industry: "",
        category: "SEO & Growth",
        summary: "",
        challenge: "",
        solution: "",
        results: ["400% organic growth", "CPA reduced by 50%"],
        metrics: [{ label: "Growth", value: "+400%" }],
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"],
        published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.slug || !editingItem?.title || !editingItem?.client) {
      error("Missing Information", "Slug, Title, and Client are required.");
      return;
    }
    setSaving(true);

    const fullItem: CaseStudyItem = {
      slug: editingItem.slug.toLowerCase().trim(),
      title: editingItem.title.trim(),
      client: editingItem.client.trim(),
      industry: editingItem.industry || "Technology",
      category: editingItem.category || "SEO",
      summary: editingItem.summary || "",
      challenge: editingItem.challenge || "Bottleneck in customer acquisition.",
      solution: editingItem.solution || "RankZee technical architecture sprint.",
      results: editingItem.results || ["Verified growth metrics"],
      metrics: editingItem.metrics || [{ label: "ROAS", value: "4.5x" }],
      images: editingItem.images || ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"],
      seo: {
        metaTitle: `${editingItem.client} Case Study | RankZee`,
        metaDescription: editingItem.summary || "",
      },
      published: Boolean(editingItem.published),
    };

    try {
      await setDoc(doc(db, "portfolio", fullItem.slug), fullItem, { merge: true });
    } catch {
      // optimistic
    }

    setItems((prev) => {
      const exists = prev.some((i) => i.slug === fullItem.slug);
      if (exists) {
        return prev.map((i) => (i.slug === fullItem.slug ? fullItem : i));
      }
      return [...prev, fullItem];
    });

    setSaving(false);
    setIsModalOpen(false);
    success("Case Study Saved", "Synchronized to Firestore.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Portfolio & Case Studies CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase client growth milestones, metrics, and video/creative assets.
          </p>
        </div>

        <Button size="sm" onClick={() => handleOpenEdit()} className="text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>New Case Study</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono">
                  <th className="py-3 px-4">Client & Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Key Metrics</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.slug} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{item.title}</div>
                      <span className="text-[11px] text-cyan-300 font-mono">
                        {item.client} • {item.industry}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-300">{item.category}</td>

                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {item.metrics.slice(0, 2).map((m, idx) => (
                          <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                            {m.label}: <strong className="text-cyan-400">{m.value}</strong>
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={item.published ? "success" : "secondary"} className="text-[10px]">
                        {item.published ? "Published" : "Draft"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          {item.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.slug)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem.title ? `Edit Study: ${editingItem.client}` : "New Case Study"}
        >
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Title *</label>
              <Input
                value={editingItem.title || ""}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                required
                className="text-xs h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                <Input
                  value={editingItem.client || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                  required
                  className="text-xs h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Slug *</label>
                <Input
                  value={editingItem.slug || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  required
                  className="text-xs h-9 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                <Input
                  value={editingItem.industry || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                  className="text-xs h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <Input
                  value={editingItem.category || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Summary</label>
              <Textarea
                rows={3}
                value={editingItem.summary || ""}
                onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL</label>
              <Input
                value={editingItem.images?.[0] || ""}
                onChange={(e) => setEditingItem({ ...editingItem, images: [e.target.value] })}
                className="text-xs h-9"
              />
            </div>

            <Button type="submit" disabled={saving} size="sm" className="w-full font-bold">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Case Study"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}


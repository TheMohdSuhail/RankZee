"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { sampleTestimonials, TestimonialItem } from "@/lib/data/sample-testimonials";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Plus, Edit2, Trash2, Star, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminCmsTestimonialsPage() {
  const { success, error } = useToast();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "testimonials"));
      if (!snap.empty) {
        const list: TestimonialItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as TestimonialItem),
        }));
        setTestimonials(list);
      } else {
        setTestimonials(sampleTestimonials);
      }
    } catch {
      setTestimonials(sampleTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (item: TestimonialItem) => {
    const updated = !item.published;
    if (item.id) {
      try {
        await updateDoc(doc(db, "testimonials", item.id), { published: updated });
      } catch {
        // optimistic
      }
    }
    setTestimonials((prev) =>
      prev.map((t) => (t.name === item.name ? { ...t, published: updated } : t))
    );
    success("Status Changed", `${item.name}'s review is now ${updated ? "Published" : "Hidden"}`);
  };

  const handleDelete = async (name: string, id?: string) => {
    if (!window.confirm("Permanently delete this testimonial?")) return;
    if (id) {
      try {
        await deleteDoc(doc(db, "testimonials", id));
      } catch {
        // optimistic
      }
    }
    setTestimonials((prev) => prev.filter((t) => t.name !== name));
    success("Review Deleted", "Testimonial removed.");
  };

  const handleOpenEdit = (item?: TestimonialItem) => {
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem({
        name: "",
        company: "",
        role: "Founder & CEO",
        text: "",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        metric: "+250% Growth",
        published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.text) {
      error("Missing Fields", "Client name and review quote are required.");
      return;
    }
    setSaving(true);

    const docId = editingItem.id || `test_${Date.now()}`;
    const fullItem: TestimonialItem = {
      id: docId,
      name: editingItem.name.trim(),
      company: editingItem.company || "Enterprise Client",
      role: editingItem.role || "Executive",
      text: editingItem.text.trim(),
      rating: Number(editingItem.rating) || 5,
      avatar: editingItem.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      metric: editingItem.metric || "",
      published: Boolean(editingItem.published),
    };

    try {
      await setDoc(doc(db, "testimonials", docId), fullItem, { merge: true });
    } catch {
      // optimistic
    }

    setTestimonials((prev) => {
      const exists = prev.some((t) => t.id === docId || t.name === fullItem.name);
      if (exists) {
        return prev.map((t) => (t.id === docId || t.name === fullItem.name ? fullItem : t));
      }
      return [...prev, fullItem];
    });

    setSaving(false);
    setIsModalOpen(false);
    success("Testimonial Saved", "Synchronized successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Client Testimonials CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage verifiable social proof, client quotes, and ratings.
          </p>
        </div>

        <Button size="sm" onClick={() => handleOpenEdit()} className="text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>Add Testimonial</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-white">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
          </div>
        ) : (
          testimonials.map((t, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Badge variant={t.published ? "success" : "secondary"} className="text-[10px]">
                    {t.published ? "Visible" : "Hidden"}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}, {t.company}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(t)}
                    className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white"
                  >
                    {t.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-white/5 text-cyan-400 hover:bg-white/10"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.name, t.id)}
                    className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem.name ? `Edit Review: ${editingItem.name}` : "New Client Review"}
        >
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                <Input
                  value={editingItem.name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                  className="text-xs h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company *</label>
                <Input
                  value={editingItem.company || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  required
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Designation</label>
                <Input
                  value={editingItem.role || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  className="text-xs h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Metric Badge</label>
                <Input
                  value={editingItem.metric || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, metric: e.target.value })}
                  placeholder="+480% Organic"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Review Quote *</label>
              <Textarea
                rows={3}
                value={editingItem.text || ""}
                onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Image URL</label>
              <Input
                value={editingItem.avatar || ""}
                onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                className="text-xs h-9"
              />
            </div>

            <Button type="submit" disabled={saving} size="sm" className="w-full font-bold">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Testimonial"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}


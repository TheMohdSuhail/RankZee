"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { sampleServices, ServiceItem } from "@/lib/data/sample-services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminCmsServicesPage() {
  const { success, error } = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit/Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "services"));
      if (!snap.empty) {
        const list: ServiceItem[] = snap.docs.map((d) => ({
          ...(d.data() as ServiceItem),
          slug: d.id,
        }));
        setServices(list);
      } else {
        setServices(sampleServices);
      }
    } catch {
      setServices(sampleServices);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (service: ServiceItem) => {
    const updated = !service.published;
    try {
      await updateDoc(doc(db, "services", service.slug), { published: updated });
    } catch {
      // optimistic
    }
    setServices((prev) =>
      prev.map((s) => (s.slug === service.slug ? { ...s, published: updated } : s))
    );
    success("Publish Status Changed", `${service.title} is now ${updated ? "Live" : "Draft"}`);
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Permanently delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", slug));
    } catch {
      // optimistic
    }
    setServices((prev) => prev.filter((s) => s.slug !== slug));
    success("Service Deleted", "Removed successfully.");
  };

  const handleOpenEdit = (svc?: ServiceItem) => {
    if (svc) {
      setEditingService(svc);
      setFeaturesInput(svc.features ? svc.features.join("\n") : "");
    } else {
      setEditingService({
        slug: "",
        title: "",
        shortDesc: "",
        longDesc: "",
        icon: "Sparkles",
        published: true,
        order: services.length + 1,
      });
      setFeaturesInput("");
    }
    setIsModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.slug || !editingService?.title) {
      error("Missing Fields", "Slug and Title are required.");
      return;
    }
    setSaving(true);
    const parsedFeatures = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const fullService: ServiceItem = {
      slug: editingService.slug.toLowerCase().trim(),
      title: editingService.title.trim(),
      shortDesc: editingService.shortDesc || "",
      longDesc: editingService.longDesc || "",
      icon: editingService.icon || "Sparkles",
      features: parsedFeatures.length > 0 ? parsedFeatures : ["Deliverable analysis"],
      deliverables: editingService.deliverables || ["Audit report"],
      faqs: editingService.faqs || [],
      seo: {
        metaTitle: `${editingService.title} | RankZee`,
        metaDescription: editingService.shortDesc || "",
        keywords: "marketing, seo, paid ads",
      },
      order: Number(editingService.order) || 0,
      published: Boolean(editingService.published),
    };

    try {
      await setDoc(doc(db, "services", fullService.slug), fullService, { merge: true });
    } catch {
      // optimistic
    }

    setServices((prev) => {
      const exists = prev.some((s) => s.slug === fullService.slug);
      if (exists) {
        return prev.map((s) => (s.slug === fullService.slug ? fullService : s));
      }
      return [...prev, fullService];
    });

    setSaving(false);
    setIsModalOpen(false);
    success("Service Saved", "CMS record synchronized.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Services CMS Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public agency capabilities, deliverables, and SEO metadata.
          </p>
        </div>

        <Button size="sm" onClick={() => handleOpenEdit()} className="text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>Add New Service</span>
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
                  <th className="py-3 px-4">Service Title</th>
                  <th className="py-3 px-4">Slug (URL)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Features</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((svc) => (
                  <tr key={svc.slug} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{svc.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                        {svc.shortDesc}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-cyan-300">/services/{svc.slug}</td>

                    <td className="py-3 px-4">
                      <Badge variant={svc.published ? "success" : "secondary"} className="text-[10px]">
                        {svc.published ? "Published" : "Draft"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-slate-400">{svc.features?.length || 0} items</td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTogglePublish(svc)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                          title={svc.published ? "Unpublish" : "Publish"}
                        >
                          {svc.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(svc)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.slug)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                          title="Delete Service"
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

      {/* Edit / Create Modal */}
      {isModalOpen && editingService && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingService.title ? `Edit Service: ${editingService.title}` : "Create New Service"}
        >
          <form onSubmit={handleSaveService} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title *</label>
              <Input
                value={editingService.title || ""}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                required
                className="text-xs h-9"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug (URL Identifier) *</label>
              <Input
                value={editingService.slug || ""}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                required
                className="text-xs h-9 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
              <Textarea
                rows={2}
                value={editingService.shortDesc || ""}
                onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Explanation</label>
              <Textarea
                rows={4}
                value={editingService.longDesc || ""}
                onChange={(e) => setEditingService({ ...editingService, longDesc: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Core Features (1 per line)
              </label>
              <Textarea
                rows={3}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                className="text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingService.published)}
                  onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-900 border-white/20"
                />
                <span>Publish Immediately</span>
              </label>
            </div>

            <Button type="submit" disabled={saving} size="sm" className="w-full font-bold">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Service to Firestore"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}


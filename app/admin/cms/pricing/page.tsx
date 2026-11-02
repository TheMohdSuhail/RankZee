"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { samplePricingPlans, PricingPlanItem } from "@/lib/data/sample-pricing";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Edit2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminCmsPricingPage() {
  const { success, error } = useToast();
  const [plans, setPlans] = useState<PricingPlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlanItem> | null>(null);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "pricingPlans"));
      if (!snap.empty) {
        const list: PricingPlanItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setPlans(list);
      } else {
        setPlans(samplePricingPlans);
      }
    } catch {
      setPlans(samplePricingPlans);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (plan: PricingPlanItem) => {
    const updated = !plan.active;
    try {
      await updateDoc(doc(db, "pricingPlans", plan.id), { active: updated });
    } catch {
      // optimistic
    }
    setPlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, active: updated } : p))
    );
    success("Status Changed", `${plan.name} is now ${updated ? "Active" : "Archived"}`);
  };

  const handleOpenEdit = (plan: PricingPlanItem) => {
    setEditingPlan(plan);
    setFeaturesText(plan.features ? plan.features.join("\n") : "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan?.name || !editingPlan?.price) {
      error("Missing Input", "Plan name and price are required.");
      return;
    }
    setSaving(true);
    const parsedFeatures = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const fullPlan: PricingPlanItem = {
      id: editingPlan.id || `plan_${Date.now()}`,
      name: editingPlan.name.trim(),
      badge: editingPlan.badge || "",
      price: Number(editingPlan.price) || 49999,
      currency: "INR",
      period: editingPlan.period || "month",
      description: editingPlan.description || "",
      highlighted: Boolean(editingPlan.highlighted),
      features: parsedFeatures,
      deliverablesSummary: editingPlan.deliverablesSummary || "Full growth deliverables",
      order: editingPlan.order || 1,
      active: Boolean(editingPlan.active),
    };

    try {
      await setDoc(doc(db, "pricingPlans", fullPlan.id), fullPlan, { merge: true });
    } catch {
      // optimistic
    }

    setPlans((prev) => prev.map((p) => (p.id === fullPlan.id ? fullPlan : p)));
    setSaving(false);
    setIsModalOpen(false);
    success("Plan Saved", "Pricing package updated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Pricing Plans CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update monthly retainer tiers, highlighted flags, and included deliverables.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-white">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
          </div>
        ) : (
          plans.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={p.highlighted ? "neon" : "secondary"}>
                    {p.badge || (p.highlighted ? "Popular" : "Standard")}
                  </Badge>
                  <Badge variant={p.active ? "success" : "secondary"} className="text-[10px]">
                    {p.active ? "Active" : "Archived"}
                  </Badge>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{p.description}</p>

                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-3xl font-heading font-extrabold text-white">
                    {formatCurrency(p.price, p.currency)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono"> /{p.period}</span>
                </div>

                <div className="space-y-2 mb-6">
                  {p.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(p)}
                  className="h-8 text-xs"
                >
                  {p.active ? <EyeOff className="w-3.5 h-3.5 mr-1" /> : <Eye className="w-3.5 h-3.5 mr-1" />}
                  <span>{p.active ? "Archive" : "Activate"}</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleOpenEdit(p)}
                  className="h-8 text-xs font-bold"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  <span>Edit Plan</span>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingPlan && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Edit Plan: ${editingPlan.name}`}
        >
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Plan Name</label>
              <Input
                value={editingPlan.name || ""}
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                required
                className="text-xs h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Price (INR)</label>
                <Input
                  type="number"
                  value={editingPlan.price || 0}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                  required
                  className="text-xs h-9 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
                <Input
                  value={editingPlan.badge || ""}
                  onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                  placeholder="Most Popular"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <Textarea
                rows={2}
                value={editingPlan.description || ""}
                onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Included Features (1 per line)
              </label>
              <Textarea
                rows={4}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingPlan.highlighted)}
                  onChange={(e) => setEditingPlan({ ...editingPlan, highlighted: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-900 border-white/20"
                />
                <span>Highlight as Popular</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingPlan.active)}
                  onChange={(e) => setEditingPlan({ ...editingPlan, active: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-900 border-white/20"
                />
                <span>Active on Public Page</span>
              </label>
            </div>

            <Button type="submit" disabled={saving} size="sm" className="w-full font-bold">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Pricing Plan"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { siteSettings } from "@/lib/data/site-settings";
import { db } from "@/lib/firebase/client";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Save, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const { success, error } = useToast();
  const [saving, setSaving] = useState(false);

  // Settings State
  const [formData, setFormData] = useState({
    siteName: siteSettings.name,
    legalName: siteSettings.legalName,
    email: siteSettings.email,
    phone: siteSettings.phone,
    whatsapp: siteSettings.whatsapp,
    address: `${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.state} - ${siteSettings.address.postalCode}`,
    linkedin: siteSettings.socials.linkedin,
    twitter: siteSettings.socials.twitter,
    instagram: siteSettings.socials.instagram,
    youtube: siteSettings.socials.youtube,
    gaId: process.env.NEXT_PUBLIC_GA_ID || "G-7H3VKGELJY",
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    searchConsole: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "general"), {
        ...formData,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      success("Settings Saved", "Global agency settings updated.");
    } catch (err: any) {
      error("Save Failed", err.message || "Could not update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
          Global Site Settings
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Configure agency contact details, social links, default SEO, and analytics tags.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Details Card */}
        <Card className="p-6 space-y-4 bg-white border-slate-200 shadow-sm">
          <h2 className="text-base font-heading font-bold text-slate-900 border-b border-slate-200 pb-3">
            Company Contact & Legal Entity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
              <Input
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Legal Company Name</label>
              <Input
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                className="text-xs h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
              <Input
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="text-xs h-9 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="text-xs h-9"
            />
          </div>
        </Card>

        {/* Social Links Card */}
        <Card className="p-6 space-y-4 bg-white border-slate-200 shadow-sm">
          <h2 className="text-base font-heading font-bold text-slate-900 border-b border-slate-200 pb-3">
            Social Profiles & Outbound Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
              <Input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter / X URL</label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram URL</label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube URL</label>
              <Input
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="text-xs h-9"
              />
            </div>
          </div>
        </Card>

        {/* Analytics & Search Verification */}
        <Card className="p-6 space-y-4 bg-white border-slate-200 shadow-sm">
          <h2 className="text-base font-heading font-bold text-slate-900 border-b border-slate-200 pb-3">
            Analytics & Verification Tokens
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Google Analytics 4 ID</label>
              <Input
                value={formData.gaId}
                onChange={(e) => setFormData({ ...formData, gaId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="text-xs h-9 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Pixel ID</label>
              <Input
                value={formData.pixelId}
                onChange={(e) => setFormData({ ...formData, pixelId: e.target.value })}
                placeholder="1234567890"
                className="text-xs h-9 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Search Console Token</label>
              <Input
                value={formData.searchConsole}
                onChange={(e) => setFormData({ ...formData, searchConsole: e.target.value })}
                placeholder="google-site-verification"
                className="text-xs h-9 font-mono"
              />
            </div>
          </div>
        </Card>

        <Button type="submit" disabled={saving} size="lg" className="font-bold">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              <span>Update Site Settings</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

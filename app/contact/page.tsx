import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { siteSettings } from "@/lib/data/site-settings";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, MessageSquare, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Growth Team | RankZee Digital Marketing Agency",
  description: "Get in touch with RankZee. Schedule a meeting, visit our Cyber City headquarters, or message us directly on WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20RankZee%20team,%20I'd%20like%20to%20discuss%20a%20digital%20marketing%20campaign`;

  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="neon" className="mb-3 uppercase tracking-wider text-xs">
            Direct Communication
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            Connect with Our <span className="text-neon-gradient">Growth Team</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Have a project in mind, need technical SEO guidance, or exploring an enterprise growth sprint? We respond within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Contact Details & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-heading font-bold text-slate-900">Direct Office Channels</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Headquarters</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {siteSettings.address.street}, {siteSettings.address.city}, {siteSettings.address.state} - {siteSettings.address.postalCode}, {siteSettings.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Inquiries</h3>
                    <a href={`mailto:${siteSettings.email}`} className="text-xs text-blue-600 hover:text-blue-700 hover:underline mt-0.5 block font-medium">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200/60 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone Support</h3>
                    <a href={`tel:${siteSettings.phone}`} className="text-xs text-slate-700 hover:text-blue-600 mt-0.5 block font-medium">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Hours of Operation</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday – Saturday: 9:30 AM – 7:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Click-to-Chat Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>

            {/* Compliance & Trust Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/70 text-xs text-slate-600 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NDA & Confidentiality Assured</span>
              </div>
              <p>
                All proprietary campaign metrics, keyword targets, and strategy disclosures are strictly protected under mutual confidentiality.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill in the form below and our leadership team will respond promptly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm h-80 sm:h-96 relative bg-slate-100">
          <iframe
            title="RankZee Cyber City Headquarters"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112217.4764835848!2d77.01777263945314!3d28.490799799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sDLF%20Cyber%20City%2C%20DLF%20Phase%202%2C%20Sector%2024%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

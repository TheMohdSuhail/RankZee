import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Service Delivery & Fulfillment Policy | RankZee Digital Solutions",
  description: "Digital delivery policy outlining timelines, milestone handovers, and electronic fulfillment for digital marketing services.",
};

export default function ShippingDeliveryPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Service Delivery & Fulfillment Policy
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Digital Service Delivery Framework
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. Nature of Delivery: 100% Digital Fulfillment</h2>
              <p>
                {siteSettings.name} (&ldquo;Company&rdquo;), operated by {siteSettings.legalName}, specializes strictly in <strong>digital services, software engineering, and strategic marketing consulting</strong>. We do not produce, warehouse, package, or dispatch tangible physical products. Consequently, no physical shipping carriers (such as courier services or postal logistics) are utilized.
              </p>
              <p className="mt-2">
                All service deliverables, strategic blueprints, code repositories, creative assets, and performance reports are fulfilled <strong>electronically</strong> via email, private client cloud drives, GitHub repositories, and interactive client dashboards.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Standard Onboarding & Initial Delivery Timelines</h2>
              <p>Upon receipt of payment authorization and signed Statement of Work:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li>
                  <strong>Project Onboarding & Kickoff:</strong> Initiated within <strong>24 to 48 hours</strong> of agreement completion. A dedicated Growth Director establishes a mutual communication channel (WhatsApp / Email) and requests account access.
                </li>
                <li>
                  <strong>Comprehensive Diagnostic Audits:</strong> Full 80+ point Technical SEO, Core Web Vitals, and Paid Ad teardowns are delivered within <strong>5 to 7 business days</strong>.
                </li>
                <li>
                  <strong>PPC & Meta Ad Campaign Launches:</strong> Following creative approval, paid campaigns are structured and set live within <strong>7 to 10 business days</strong>.
                </li>
                <li>
                  <strong>Custom Web Development Sprints:</strong> UI/UX wireframes delivered within <strong>10 business days</strong>; production-ready Next.js web applications delivered in milestone stages over <strong>3 to 5 weeks</strong>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Methods of Digital Handover</h2>
              <p>Deliverables are dispatched through secure electronic vectors:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>
                  <strong>Reports & Strategic Documentation:</strong> Delivered via email in PDF/Spreadsheet formats alongside direct access to live Looker Studio executive dashboards.
                </li>
                <li>
                  <strong>Creative Assets & Media:</strong> Transferred via Google Drive, Figma links, or cloud storage download links.
                </li>
                <li>
                  <strong>Code & Software:</strong> Transferred via GitHub/GitLab repositories with deploy pipelines configured on Vercel.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Client Dependencies & Delays</h2>
              <p>
                Delivery timelines are contingent on timely receipt of client assets, including domain DNS access, Google Analytics/Search Console privileges, brand collateral, and prompt review of draft creatives. Any delays exceeding 7 business days in client feedback will correspondingly extend the delivery schedule without penalty to {siteSettings.name}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. Delivery Disputes & Confirmation</h2>
              <p>
                Deliverables are deemed accepted if no revision requests or defects are reported within <strong>7 business days</strong> of electronic delivery. For questions concerning project milestones or delivery schedules, contact your Growth Director or email <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

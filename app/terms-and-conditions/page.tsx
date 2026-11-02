import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Terms and Conditions | RankZee Digital Marketing Agency",
  description: "Terms and conditions governing the use of RankZee Digital Solutions services and web platforms.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Effective Date: Immediately
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. Introduction & Acceptance of Terms</h2>
              <p>
                Welcome to {siteSettings.name} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated by {siteSettings.legalName}, with its registered office at {siteSettings.address.street}, {siteSettings.address.city}, {siteSettings.address.state} - {siteSettings.address.postalCode}, India. By accessing our website ({siteSettings.url}) or contracting for our digital marketing, SEO, paid media, web development, or consulting services, you agree to be bound by these Terms and Conditions and our Privacy Policy.
              </p>
              <p className="mt-2">
                If you do not agree to these terms, you must discontinue the use of our services immediately. These terms apply to all visitors, clients, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Scope of Digital Marketing Services</h2>
              <p>
                {siteSettings.name} provides performance-driven digital marketing solutions including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Technical Search Engine Optimization (SEO) and Link Acquisition</li>
                <li>Pay-Per-Click Advertising (Google Ads, Bing Ads, YouTube Ads)</li>
                <li>Social Media Marketing & Paid Advertising (Meta Ads, LinkedIn Ads)</li>
                <li>Content Marketing, Copywriting, and Digital PR</li>
                <li>Next.js Web Design, Jamstack Development, and Speed Optimization</li>
                <li>Email Marketing, WhatsApp Business Automation, and Lead Nurturing</li>
                <li>Web Analytics Setup (GA4, GTM), Server-Side Tracking, and CRO</li>
              </ul>
              <p className="mt-2">
                Specific project deliverables, timelines, and budgets are detailed in the respective Client Service Agreement (Statement of Work / SOW) or selected service package.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Retainers, Fees & Payment Processing</h2>
              <p>
                All fees for services are billed in advance on a monthly or sprint basis as defined in your service agreement. Invoices must be settled within the grace period indicated on the invoice.
              </p>
              <p className="mt-2">
                Payments are processed securely via authorized third-party PCI-DSS compliant payment gateways, including Razorpay, Stripe, and authorized banking partners. By executing a transaction, you authorize the gateway to charge your chosen payment instrument.
              </p>
              <p className="mt-2">
                Ad spend budgets (payable to Google, Meta, or third-party networks) are paid directly by the client to the advertising networks or disbursed strictly as pass-through funds without markup.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Client Responsibilities & Access</h2>
              <p>
                To ensure campaign efficacy, the Client agrees to provide timely access to necessary digital assets, including Google Search Console, Google Analytics 4, Meta Business Manager, tag managers, domain DNS records, and CMS credentials. Delays in granting access or approving strategic collateral may extend milestone timelines.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. Intellectual Property Rights</h2>
              <p>
                Upon receipt of full payment for any completed deliverable, all custom content, graphic designs, proprietary ad copies, and source code generated specifically for the Client shall become the property of the Client.
              </p>
              <p className="mt-2">
                {siteSettings.name} retains ownership of pre-existing frameworks, internal methodologies, proprietary algorithms, tools, and code libraries developed prior to or independently of the client engagement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">6. Disclaimers & Performance Realities</h2>
              <p>
                Search engines (such as Google) and advertising platforms (such as Meta) update their ranking algorithms and delivery policies autonomously. While {siteSettings.name} applies industry-best practices and verifiable engineering frameworks, no digital agency can legally or factually guarantee a permanent #1 position on Google or an exact fixed ROAS.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable Indian law, in no event shall {siteSettings.legalName}, its directors, employees, or partners be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including loss of profits, goodwill, or business interruption.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">8. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana, India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">9. Grievance Officer & Contact Details</h2>
              <p>
                In accordance with the Information Technology Act, 2000 and the rules made thereunder:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 mt-2">
                <p className="font-semibold text-slate-900">Grievance Redressal Officer: {siteSettings.grievanceOfficer.name}</p>
                <p>Designation: {siteSettings.grievanceOfficer.designation}</p>
                <p>Email: {siteSettings.grievanceOfficer.email}</p>
                <p>Phone: {siteSettings.grievanceOfficer.phone}</p>
                <p>Address: {siteSettings.address.street}, {siteSettings.address.city}, {siteSettings.address.state} - {siteSettings.address.postalCode}, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy | RankZee Digital Solutions",
  description: "Comprehensive Privacy Policy covering personal data processing, Firebase cloud storage, cookies, GDPR compliance, and Indian IT Act protocols.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Compliant with Digital Personal Data Protection Act (DPDPA) & GDPR
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. Overview & Commitment to Privacy</h2>
              <p>
                {siteSettings.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), operated by {siteSettings.legalName}, takes your personal privacy seriously. This Privacy Policy details how we collect, store, process, protect, and disclose information when you visit our website ({siteSettings.url}), submit leads or consultation requests, or utilize our digital marketing client platforms.
              </p>
              <p className="mt-2">
                We operate in full alignment with the <strong>Information Technology Act, 2000</strong>, the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> of India, and the European Union General Data Protection Regulation (GDPR) for international visitors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Information We Collect</h2>
              <p>We collect information you explicitly provide and automated technical data:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>
                  <strong>Direct Identification Details:</strong> Name, work email address, telephone/WhatsApp number, company name, domain URL, and billing address when you submit an inquiry, schedule a strategy audit, or subscribe to our newsletter.
                </li>
                <li>
                  <strong>Project & Technical Data:</strong> Marketing objectives, current ad budgets, target keyword preferences, and website technical requirements provided in diagnostic questionnaires.
                </li>
                <li>
                  <strong>Payment Information:</strong> Transaction identifiers, payment methods (UPI, Card, Net Banking), and invoice records. Please note: We do NOT store full credit card numbers or CVVs on our servers; all payment transactions are tokenized through PCI-DSS Level 1 certified gateways (e.g. Razorpay, Stripe).
                </li>
                <li>
                  <strong>Telemetry & Device Data:</strong> IP address, device type, browser user-agent, operating system, approximate geographic location, and interaction logs.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. How We Use Firebase Cloud Infrastructure</h2>
              <p>
                Our web infrastructure utilizes Google Firebase (Authentication, Cloud Firestore, and Cloud Storage) hosted in secure global data centers:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>
                  <strong>Firebase Authentication:</strong> Manages secure user login tokens, encrypted passwords, and OAuth credentials using industry-standard OAuth2 / JWT protocols.
                </li>
                <li>
                  <strong>Cloud Firestore:</strong> Secure NoSQL database storing user profiles, submitted lead requests, consultation appointments, and CMS records governed by strict server-side Firestore Security Rules.
                </li>
                <li>
                  <strong>Firebase Storage:</strong> Stores authenticated media assets and project documentation using encrypted Google Cloud Storage buckets.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Cookies & Web Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to remember user preferences, ensure session integrity, and evaluate site performance.
              </p>
              <p className="mt-2">
                <strong>Consent Management:</strong> In strict compliance with global privacy regulations, non-essential cookies (such as Google Analytics 4 and Meta Pixel tracking scripts) are loaded ONLY after you explicitly grant consent through our interactive Cookie Consent Banner. You may update or revoke your preferences at any time via our Cookie Policy page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. Data Sharing & Third-Party Processors</h2>
              <p>
                We never sell, rent, or trade your personal data. We disclose data solely to trusted subprocessors essential for delivering our service:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Cloud hosting: Vercel Inc. and Google Cloud Platform (Firebase)</li>
                <li>Payment gateways: Razorpay Software Private Limited / Stripe Inc.</li>
                <li>Communication APIs: WhatsApp Business API (Meta) and SendGrid/Postmark for transactional emails</li>
                <li>Legal Authorities: Only when mandatory under applicable Indian law, judicial decree, or law enforcement investigation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">6. Your Rights Under DPDPA & GDPR</h2>
              <p>You possess enforceable rights regarding your personal information:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Right to access and review your stored personal records</li>
                <li>Right to correction and updating of inaccurate data</li>
                <li>Right to erasure (&ldquo;Right to be Forgotten&rdquo;) and deletion of account data</li>
                <li>Right to withdraw marketing consent or unsubscribe from newsletters</li>
                <li>Right to file a grievance with our designated Grievance Officer</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, email your request to <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>. Requests are addressed within 30 calendar days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">7. Grievance Officer Details</h2>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 mt-2">
                <p className="font-semibold text-slate-900">Name: {siteSettings.grievanceOfficer.name}</p>
                <p>Designation: {siteSettings.grievanceOfficer.designation}</p>
                <p>Email: {siteSettings.grievanceOfficer.email}</p>
                <p>Address: {siteSettings.legalName}, {siteSettings.address.street}, {siteSettings.address.city}, {siteSettings.address.state} - {siteSettings.address.postalCode}, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

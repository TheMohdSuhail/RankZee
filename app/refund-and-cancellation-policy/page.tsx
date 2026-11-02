import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | RankZee Digital Solutions",
  description: "Official refund and cancellation policy governing digital marketing retainers, sprint milestones, and payment processing.",
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Payment Gateway Compliance Approved
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. Nature of Digital Marketing Services</h2>
              <p>
                {siteSettings.name} (&ldquo;Company&rdquo;), operated by {siteSettings.legalName}, provides bespoke professional digital marketing services, including technical SEO audits, pay-per-click ad management, custom website development, creative asset production, and marketing automation.
              </p>
              <p className="mt-2">
                Due to the intensive intellectual property, human engineering hours, and strategic planning dedicated immediately upon initiation of an engagement, our refund and cancellation protocols reflect standard industry benchmarks for agency consulting.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Subscription & Monthly Retainer Cancellations</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li>
                  <strong>Initial Sprint Commitments:</strong> Standard growth packages initiate with a defined 90-day execution sprint to allow algorithms sufficient data aggregation.
                </li>
                <li>
                  <strong>Ongoing Monthly Retainers:</strong> Following completion of the primary sprint, retainers renew on a month-to-month cadence. Clients may cancel future billing by delivering written notice at least <strong>15 business days prior</strong> to the next billing date via email to <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>.
                </li>
                <li>
                  <strong>Mid-Cycle Cancellations:</strong> If a cancellation notice is submitted mid-billing cycle, services will continue through the remainder of that paid cycle, and no further charges will be billed. Pro-rata refunds for unused days within an active cycle are not granted once strategic work has begun.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Refund Eligibility Criteria</h2>
              <p>Refunds are evaluated objectively under the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li>
                  <strong>Duplicate or Erroneous Transactions:</strong> In the event of a technical processing error, dual charge, or inadvertent overbilling via our payment gateway (Razorpay / Stripe), the excess charged amount will be refunded <strong>100% in full</strong> without deduction.
                </li>
                <li>
                  <strong>Cancellation Prior to Project Onboarding:</strong> If a client requests cancellation within <strong>48 hours</strong> of invoice settlement and prior to the commencement of any discovery audits, account restructuring, or creative drafting, a refund will be issued minus standard gateway transaction fees (typically 2-3%).
                </li>
                <li>
                  <strong>Ad Spend Disbursements:</strong> Unspent third-party advertising funds held in escrow for ad delivery (Google Ads, Meta Ads) will be refunded in full upon campaign decommissioning, provided no pending platform balances exist.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Non-Refundable Items</h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Completed technical SEO audits, keyword research matrices, and strategic roadmaps.</li>
                <li>Custom website design mockups, frontend code, or custom software deliverables already executed.</li>
                <li>Advertising media spend disbursed directly to Google LLC, Meta Platforms Inc., or LinkedIn Corp.</li>
                <li>Third-party software subscriptions, domain registrations, or SSL certificates acquired on client behalf.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. Refund Processing Timeline</h2>
              <p>
                Approved refund requests are authorized within <strong>3 to 5 business days</strong> from receipt of written confirmation. Once initiated, banking gateways typically credit funds to the original payment instrument (Credit Card, Debit Card, Net Banking, or UPI) within <strong>5 to 7 working days</strong>, subject to the client&apos;s bank turnaround time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">6. Grievance & Inquiries</h2>
              <p>
                For questions concerning invoicing, cancellations, or billing discrepancies, please reach out to our accounts team at <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a> or phone {siteSettings.phone}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

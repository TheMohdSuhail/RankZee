import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | RankZee Digital Solutions",
  description: "Acceptable use guidelines, platform rules, and ethical standards governing RankZee services and web assets.",
};

export default function AcceptableUsePolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Acceptable Use Policy
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Platform & Agency Integrity Guidelines
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. Purpose & Application</h2>
              <p>
                This Acceptable Use Policy (&ldquo;AUP&rdquo;) defines acceptable and prohibited behavior regarding the use of {siteSettings.name} (&ldquo;Company&rdquo;), our web platforms ({siteSettings.url}), APIs, client dashboard systems, and contracted digital marketing services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Prohibited Uses of Our Web Platforms</h2>
              <p>When accessing our website or forms, you agree NOT to:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Deploy unauthorized scrapers, spiders, or automated bots that place unreasonable load on our infrastructure.</li>
                <li>Inject malicious code, viruses, worms, Trojan horses, or corrupted files.</li>
                <li>Attempt to circumvent security boundaries, authentication controls, or rate-limiting mechanisms.</li>
                <li>Submit fraudulent, deceptive, or spam inquiries via our consultation booking or lead forms.</li>
                <li>Interfere with or disrupt the integrity or performance of the servers hosting our website or databases.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Ethical Marketing Standards for Clients</h2>
              <p>
                {siteSettings.name} upholds rigorous ethical guidelines and compliance standards. We strictly refuse to provide SEO, advertising, or web development services for businesses involved in:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                <li>Illegal gambling, unregulated betting, or unauthorized casino operations under Indian law.</li>
                <li>Deceptive financial schemes, ponzi models, or high-risk unauthorized crypto offerings.</li>
                <li>Counterfeit goods, intellectual property infringement, or pirated media.</li>
                <li>Adult content, sexually explicit materials, or non-consensual exploitation.</li>
                <li>Hate speech, harassment, defamation, or content violating the Indian Information Technology Rules.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Enforcement & Termination</h2>
              <p>
                Violations of this Acceptable Use Policy may result in immediate cancellation of ongoing marketing sprints without refund, and potential referral to legal or law enforcement authorities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. Reporting Abuses</h2>
              <p>
                If you identify any violation of this policy, please notify our compliance officer immediately at <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

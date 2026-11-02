import React from "react";
import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Disclaimer & Algorithmic Notice | RankZee Digital Solutions",
  description: "Official legal disclaimer regarding search engine ranking algorithms, third-party advertising platforms, and performance estimates.",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Disclaimer & Disclosures
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Performance & Operational Disclosures
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. General Information Disclaimer</h2>
              <p>
                The information provided by {siteSettings.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) on {siteSettings.url} and via our marketing consultations, blog publications, and diagnostic audits is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Search Engine & Algorithmic Volatility Notice</h2>
              <p>
                Search engines (principally Google, Bing, Yahoo) and social advertising platforms (Meta, LinkedIn) operate proprietary, closed-source algorithms that update continuously and autonomously without notice.
              </p>
              <p className="mt-2">
                <strong>No Guarantee of #1 Ranking:</strong> In full compliance with Google Webmaster and Search Essentials Guidelines, {siteSettings.name} unequivocally states that <strong>no ethical digital agency can guarantee a specific rank, position #1 placement, or permanent search prominence for any keyword</strong>. While we deploy cutting-edge technical architecture, topical authority clusters, and white-hat link acquisition that have generated extraordinary client growth, historical performance does not guarantee future algorithm immunity.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Earnings & ROAS Projections Disclaimer</h2>
              <p>
                Any revenue figures, Return on Ad Spend (ROAS) multiples (e.g. 5.2x, 4.8x), keyword growth percentages, or client case studies showcased on this website are actual results achieved for specific businesses under rigorous conditions. They are <strong>not guarantees or promises</strong> of identical results for your business.
              </p>
              <p className="mt-2">
                Individual marketing performance depends on variables beyond our direct control, including your market maturity, competitive intensity, product-market fit, unit economics, pricing, sales follow-up velocity, and consumer demand.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Third-Party Platform Policies & Account Bans</h2>
              <p>
                Advertising networks (such as Meta Ads Manager and Google Ads) enforce strict compliance standards. While our team designs all creatives, landing pages, and copy to adhere to platform policies, we cannot be held liable for autonomous account suspensions, automated ad rejections, or policy shifts enacted by third-party platforms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">5. External Hyperlinks Disclaimer</h2>
              <p>
                Our website may contain links to other websites or content belonging to third parties. Such external links are not monitored, checked for accuracy, or endorsed by us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">6. Contact for Clarifications</h2>
              <p>
                If you require further details regarding any item in this disclaimer, please contact us at <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface PricingPlanItem {
  id: string;
  name: string;
  badge?: string;
  price: number; // in INR
  currency: string;
  period: string; // 'month' | 'quarter' | 'year'
  description: string;
  highlighted: boolean;
  features: string[];
  notIncluded?: string[];
  deliverablesSummary: string;
  order: number;
  active: boolean;
}

export const samplePricingPlans: PricingPlanItem[] = [
  {
    id: "plan-starter",
    name: "Starter Velocity",
    badge: "For Emerging Brands",
    price: 49999,
    currency: "INR",
    period: "month",
    description: "Ideal for startups and growing businesses ready to build foundational search rankings and social traction.",
    highlighted: false,
    features: [
      "Target up to 20 High-Intent Commercial Keywords",
      "Full Technical SEO Audit & On-Page Corrections",
      "12 Custom Branded Social Creatives / Month",
      "2 Long-Form Authority Blog Articles / Month",
      "Google Business Profile & Local Map Optimization",
      "Bi-Weekly Progress & KPI Reports",
      "Email & Slack Dedicated Support",
    ],
    notIncluded: [
      "Custom Server-side GA4 / CAPI",
      "High-Production Video Ads",
      "Dedicated CRO Sprint",
    ],
    deliverablesSummary: "Essential SEO + Social presence to gain initial Page 1 traction.",
    order: 1,
    active: true,
  },
  {
    id: "plan-growth",
    name: "Growth Dominance",
    badge: "Most Popular",
    price: 99999,
    currency: "INR",
    period: "month",
    description: "The complete multi-channel growth engine for businesses looking to scale aggressively and dominate their market.",
    highlighted: true,
    features: [
      "Target up to 60 Commercial Keywords across Funnels",
      "Full PPC / Google Ads & Meta Ads Funnel Management",
      "24 High-Impact Social Posts & Reels / Month",
      "4 Deep-Dive Authority Articles + Lead Magnet",
      "High-Authority Backlink Acquisition (5 Tier-1 links/mo)",
      "Server-Side GA4 & Meta Conversions API (CAPI)",
      "Conversion Rate Optimization (CRO) Landing Page Testing",
      "Weekly Strategic Sync & Live Real-Time Dashboard",
      "Dedicated Growth Director & Creative Pod",
    ],
    deliverablesSummary: "Full-funnel SEO, Paid Media, and High-Velocity Creative Engine.",
    order: 2,
    active: true,
  },
  {
    id: "plan-premium",
    name: "Enterprise Market Leader",
    badge: "Custom Scale",
    price: 199999,
    currency: "INR",
    period: "month",
    description: "Uncapped omni-channel dominance for established brands requiring enterprise SEO, global ad spend management, and custom tech.",
    highlighted: false,
    features: [
      "Unlimited Commercial & Informational Keyword Clusters",
      "Multi-Market & International Search Dominance",
      "Advanced Omnichannel Ad Scaling (Google, Meta, LinkedIn, YouTube)",
      "Daily Creative Production (Reels, Motion Graphics, Ad Variants)",
      "Dedicated 24/7 Slack Channel & VIP Support Team",
      "Custom Next.js Web Development & Performance Engineering",
      "Full PR, Influencer Outreach & Tier-1 Media Placement",
      "Enterprise Data Warehousing & Custom Attribution Models",
      "Quarterly On-Site Growth Strategy Summit",
    ],
    deliverablesSummary: "Autonomous growth pod operating as an extension of your c-suite.",
    order: 3,
    active: true,
  },
];


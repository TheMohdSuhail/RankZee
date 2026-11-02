export interface CaseStudyItem {
  id?: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  images: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  published: boolean;
}

export const samplePortfolio: CaseStudyItem[] = [
  {
    slug: "fintech-scale-organic-lead-generation",
    title: "Scaling Fintech Organic Search Traffic by 480% in 7 Months",
    client: "PaySprint Global",
    industry: "B2B FinTech & Payments",
    category: "SEO & Content Marketing",
    summary: "How RankZee restructured PaySprint's core information architecture, fixed critical Core Web Vitals, and established high-intent topic clusters to capture commercial search dominance.",
    challenge: "PaySprint was burning $25k monthly on Google Ads while their organic presence was buried behind legacy competitors on Page 4.",
    solution: "We deployed an aggressive semantic cluster architecture covering 120+ high-volume commercial keywords, repaired severe render-blocking JavaScript bottlenecks, and secured 45 tier-1 authoritative editorial backlinks.",
    results: [
      "480% increase in qualified organic search visits",
      "#1 rankings for 38 target transactional keywords",
      "Cost-per-acquisition (CPA) reduced by 64%",
      "Added ₹1.8 Crore in pipeline ARR from organic search",
    ],
    metrics: [
      { label: "Organic Traffic Growth", value: "+480%" },
      { label: "Top 3 Keywords", value: "38" },
      { label: "CPA Reduction", value: "-64%" },
      { label: "New Pipeline ARR", value: "₹1.8 Cr" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    testimonial: {
      quote: "RankZee took our enterprise search presence from invisible to industry benchmark. The ROI on our organic pipeline has surpassed our paid channels.",
      author: "Vikram Singhania",
      role: "VP of Growth, PaySprint",
    },
    seo: {
      metaTitle: "Fintech SEO Case Study: +480% Organic Leads | RankZee",
      metaDescription: "Learn how RankZee drove 480% organic growth and 38 #1 Google rankings for B2B fintech leader PaySprint.",
    },
    published: true,
  },
  {
    slug: "d2c-fashion-roas-meta-scaling",
    title: "Scaling D2C Sustainable Apparel to 5.2x ROAS with Meta Ads",
    client: "AuraThread Lifestyle",
    industry: "E-Commerce / D2C Fashion",
    category: "Meta Ads & Creative Testing",
    summary: "Rapid creative iteration and Advantage+ catalog funnels unlocked massive scalability for AuraThread across Instagram & Facebook.",
    challenge: "Ad fatigue and rising CPMs had crushed AuraThread's ROAS below break-even (1.4x), stalling revenue at ₹15 Lakhs/month.",
    solution: "We launched an agile UGC sprint producing 12 new video hooks weekly, restructured campaigns into a streamlined Advantage+ framework, and configured server-side Conversions API.",
    results: [
      "Scaled monthly revenue from ₹15 Lakhs to ₹92 Lakhs",
      "Sustained 5.2x Blended Return on Ad Spend (ROAS)",
      "42% improvement in purchase conversion rate",
      "Customer acquisition cost dropped by 48%",
    ],
    metrics: [
      { label: "Blended ROAS", value: "5.2x" },
      { label: "Monthly Revenue", value: "₹92L" },
      { label: "CAC Reduction", value: "-48%" },
      { label: "Store Conv. Rate", value: "3.8%" },
    ],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    ],
    testimonial: {
      quote: "The creative velocity RankZee brings is unmatched. They turned our Meta Ads into a predictable cash engine.",
      author: "Pooja Mehta",
      role: "Co-Founder, AuraThread",
    },
    seo: {
      metaTitle: "D2C E-commerce Meta Ads Case Study: 5.2x ROAS | RankZee",
      metaDescription: "Discover how RankZee scaled sustainable fashion brand AuraThread to ₹92L/month at a 5.2x ROAS.",
    },
    published: true,
  },
  {
    slug: "b2b-saas-google-ads-demand-gen",
    title: "Tripling Qualified Enterprise SQLs with High-Intent Google Search",
    client: "CloudDesk Technologies",
    industry: "B2B SaaS / HRTech",
    category: "PPC & Google Ads",
    summary: "Restructuring Google Search campaigns to filter out unqualified job seekers and capture high-intent enterprise CTO searches.",
    challenge: "CloudDesk's previous agency was driving clicks from job seekers rather than decision makers, leading to a 90% bounce rate on demo bookings.",
    solution: "We implemented exact and phrase match sculpting, aggressive negative keyword lists, offline conversion import via CRM sync, and dedicated dynamic landing pages.",
    results: [
      "310% increase in Sales Qualified Leads (SQLs)",
      "Closed 14 Fortune-500 pilot contracts in 90 days",
      "51% drop in cost per qualified demo",
      "Total contract value influenced: ₹3.4 Crores",
    ],
    metrics: [
      { label: "SQL Increase", value: "+310%" },
      { label: "Cost Per Demo", value: "-51%" },
      { label: "Enterprise Pilots", value: "14" },
      { label: "Pipeline Value", value: "₹3.4 Cr" },
    ],
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    ],
    testimonial: {
      quote: "RankZee understands B2B SaaS. We stopped wasting budget on student queries and started filling our calendar with Enterprise CTOs.",
      author: "Rohan Varma",
      role: "Chief Revenue Officer, CloudDesk",
    },
    seo: {
      metaTitle: "B2B SaaS PPC Case Study: +310% Demo Bookings | RankZee",
      metaDescription: "Explore how RankZee optimized Google Ads to triple enterprise SQLs and slash cost-per-demo by 51%.",
    },
    published: true,
  },
  {
    slug: "healthtech-web-transformation-and-branding",
    title: "Modern Next.js Web Experience & Branding for HealthTech Unicorn",
    client: "ArogyaPlus Medical",
    industry: "Healthcare / Telemedicine",
    category: "Web Development & Branding",
    summary: "Rebuilding a clunky legacy portal into a blistering 99 Lighthouse score Next.js platform that converted 3x more appointments.",
    challenge: "ArogyaPlus had a 7-second page load time causing a 70% abandonment rate on mobile consultation bookings.",
    solution: "We designed a full brand identity overhaul with a custom design system and built a modular Next.js App Router application with sub-800ms load times across 4G mobile devices.",
    results: [
      "Mobile page load time reduced from 7.2s to 0.7s",
      "Patient booking conversion increased by 215%",
      "Lighthouse performance score achieved: 99/100",
      "Recognized with Awwwards Site of the Day nominee",
    ],
    metrics: [
      { label: "Page Load Speed", value: "0.7s" },
      { label: "Conversion Lift", value: "+215%" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Mobile Bounce", value: "-62%" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    ],
    testimonial: {
      quote: "RankZee turned our clunky healthcare site into a modern, lightning-fast digital clinic. Our patients love the seamless booking experience.",
      author: "Dr. Ananya Sen",
      role: "Managing Director, ArogyaPlus",
    },
    seo: {
      metaTitle: "HealthTech Next.js Web Development Case Study | RankZee",
      metaDescription: "See how RankZee rebuilt ArogyaPlus into a sub-second Next.js web application, boosting patient appointments by 215%.",
    },
    published: true,
  },
];


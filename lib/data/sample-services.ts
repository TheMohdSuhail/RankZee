export interface ServiceItem {
  id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  features: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  order: number;
  published: boolean;
}

export const sampleServices: ServiceItem[] = [
  {
    slug: "seo-search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    shortDesc: "Dominate Google Page 1. High-intent keyword targeting, technical audits, and high-authority link acquisition.",
    longDesc: "Our battle-tested SEO architecture puts your business at the very top of Google search results. We combine deep technical crawl optimization, semantic content clusters, Core Web Vitals enhancement, and white-hat contextual backlink building to generate sustained organic inbound leads without paying per click.",
    icon: "Search",
    features: [
      "Technical Core Web Vitals & Crawlability Audits",
      "High-Intent Commercial Keyword Mapping",
      "On-Page Optimization & Schema Markup",
      "Editorial White-Hat Authority Link Building",
      "Local SEO & Google Business Profile Dominance",
      "Monthly Transparent Keyword & ROI Reports",
    ],
    deliverables: [
      "Comprehensive 80+ point Technical Audit",
      "Keyword Matrix & Content Roadmap",
      "Full On-Page Metadata & Header Implementations",
      "Monthly Live Rank Tracking Dashboard",
    ],
    faqs: [
      {
        question: "How long does it take to see top SEO results?",
        answer: "Most competitive campaigns start demonstrating notable traffic and keyword ranking improvements within 60 to 90 days, with exponential growth compounding at the 6-month mark.",
      },
      {
        question: "Do you guarantee #1 ranking on Google?",
        answer: "Google's algorithms evolve constantly, so no honest agency guarantees a specific position. However, RankZee has a 94% track record of taking target high-intent commercial keywords into Google's top 3 positions.",
      },
    ],
    seo: {
      metaTitle: "Premier SEO Services | RankZee Digital Marketing Agency",
      metaDescription: "Scale organic revenue with data-driven Search Engine Optimization. Rank #1 on Google with RankZee's proven SEO frameworks.",
      keywords: "SEO services, search engine optimization, rank #1 google, technical seo, local seo agency",
    },
    order: 1,
    published: true,
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing (SMM)",
    shortDesc: "Build an engaged, loyal community across Instagram, LinkedIn, and YouTube that converts into recurring customers.",
    longDesc: "Transform passive scrollers into fervent brand advocates. Our social media specialists build vibrant visual storytelling, high-retention short-form video reels, and community engagement workflows that elevate your digital authority and drive hyper-qualified referral traffic.",
    icon: "Share2",
    features: [
      "Cross-Platform Content Creation & Curation",
      "High-Retention Reels, Shorts & Motion Graphics",
      "Influencer Partnerships & UGC Campaigns",
      "Community Management & Rapid Comment Response",
      "Strategic Editorial Calendar & Publishing",
      "Social Sentiment & Brand Affinity Analytics",
    ],
    deliverables: [
      "Monthly 30-Day Content Matrix with Ready Creatives",
      "Branded Story & Reel Templates",
      "Engagement & Follower Growth Performance Reports",
    ],
    faqs: [
      {
        question: "Which social platforms are best for my brand?",
        answer: "For B2B brands, we aggressively target LinkedIn and YouTube; for B2C, D2C, and lifestyle brands, we focus on Instagram, YouTube Shorts, and Facebook.",
      },
    ],
    seo: {
      metaTitle: "Social Media Marketing Agency | RankZee",
      metaDescription: "Ignite viral reach and build a thriving social presence across Instagram, LinkedIn, and YouTube with RankZee.",
      keywords: "social media marketing, SMM agency, instagram growth, linkedin B2B marketing, reels management",
    },
    order: 2,
    published: true,
  },
  {
    slug: "ppc-google-ads",
    title: "PPC & Google Ads Management",
    shortDesc: "Predictable, scalable customer acquisition with precision Google Search, Performance Max, and Shopping campaigns.",
    longDesc: "Stop burning ad budget on low-intent clicks. We engineer hyper-segmented Google Search, Performance Max, Display, and Remarketing funnels laser-focused on bottom-of-the-funnel buyers. Every rupee spent is tied directly to ROAS and customer lifetime value.",
    icon: "Target",
    features: [
      "Google Search, Display & Performance Max Campaigns",
      "Negative Keyword Sculpting & Click Fraud Prevention",
      "High-Converting Landing Page Design & CRO",
      "Enhanced Server-Side Conversion Tracking",
      "A/B Creative & Ad Copy Split Testing",
      "Bid Strategy Automation & Target ROAS Optimization",
    ],
    deliverables: [
      "Account Restructure & Quality Score Elevation",
      "Ad Copy & Responsive Search Variations",
      "Custom Looker Studio Real-Time ROAS Dashboard",
    ],
    faqs: [
      {
        question: "What minimum budget is required for Google Ads?",
        answer: "We recommend a starting ad spend of ₹40,000 to ₹1,00,000/month for localized campaigns and ₹1,50,000+/month for national scale to achieve statistical significance quickly.",
      },
    ],
    seo: {
      metaTitle: "Google Ads & PPC Management Agency | High ROAS | RankZee",
      metaDescription: "Maximize ROI with Google Ads certified experts. Precision search, PMax, and remarketing funnels that deliver customer acquisition.",
      keywords: "google ads agency, pay per click management, PPC campaigns, performance max, google ads management india",
    },
    order: 3,
    published: true,
  },
  {
    slug: "meta-ads-facebook-instagram",
    title: "Meta Ads (Facebook & Instagram)",
    shortDesc: "High-velocity creative testing and algorithmic scaling to capture cold audiences and maximize direct return on ad spend.",
    longDesc: "Meta's Advantage+ algorithm demands non-stop creative velocity. We develop scroll-stopping video hooks, high-converting carousel formats, and psychological buyer-journey angles that lower your Cost-Per-Acquisition (CPA) and sustainably scale sales.",
    icon: "Megaphone",
    features: [
      "Advantage+ Shopping & Catalog Campaigns",
      "Full-Funnel Creative Sprint & Video Hooks",
      "Custom & Lookalike Audience Modeling",
      "Conversions API (CAPI) Server-to-Server Setup",
      "Dynamic Product Remarketing Funnels",
      "Creative Fatigue Alerts & Rapid Asset Refresh",
    ],
    deliverables: [
      "8-16 High-Performing Video & Static Creatives per Month",
      "Ad Copy Matrix (Direct Response + Story angles)",
      "Real-time Meta Pixel & CAPI Attribution Tracking",
    ],
    faqs: [
      {
        question: "How do you overcome iOS privacy tracking limits?",
        answer: "We implement Meta Conversions API (CAPI) on cloud servers alongside first-party offline data sync to achieve 95%+ event match quality scores.",
      },
    ],
    seo: {
      metaTitle: "Meta Ads Agency (Facebook & Instagram) | Scale Your ROAS | RankZee",
      metaDescription: "Accelerate your D2C and B2B growth with data-driven Facebook & Instagram Meta Ad campaigns engineered for conversion.",
      keywords: "meta ads agency, facebook advertising, instagram ads, social ads scaling, CAPI meta",
    },
    order: 4,
    published: true,
  },
  {
    slug: "content-marketing",
    title: "Content Marketing & Authority Writing",
    shortDesc: "Establish thought leadership with high-value technical articles, industry reports, and conversion-focused copy.",
    longDesc: "Content that ranks, educates, and persuades. We produce deeply researched long-form articles, whitepapers, case studies, and buyer guides that capture search intent, establish your brand as the definitive authority, and fuel your sales pipeline.",
    icon: "FileText",
    features: [
      "Topic Cluster & Semantic Pillar Strategy",
      "Long-Form Technical & Industry Thought Leadership",
      "Lead Magnets, Whitepapers & Ebooks",
      "Brand Voice Guidelines & Tone Blueprint",
      "Content Repurposing across Multi-Channels",
      "SEO-Driven Readability & Conversion Optimization",
    ],
    deliverables: [
      "4 to 8 Research-Backed In-Depth Articles/Month",
      "Quarterly Premium Gated Lead Magnet",
      "Organic Engagement & Backlink Pickup Analytics",
    ],
    faqs: [
      {
        question: "Do you write industry-specific technical content?",
        answer: "Yes, our editorial team includes subject-matter researchers who collaborate directly with your technical leaders to ensure 100% domain accuracy.",
      },
    ],
    seo: {
      metaTitle: "B2B Content Marketing & Copywriting Services | RankZee",
      metaDescription: "Build compound organic traffic and authority with RankZee's industry-grade content marketing and thought leadership services.",
      keywords: "content marketing agency, thought leadership, b2b content, copywriting, seo blog writing",
    },
    order: 5,
    published: true,
  },
  {
    slug: "email-whatsapp-marketing",
    title: "Email & WhatsApp Marketing",
    shortDesc: "Automated retention, omnichannel drip funnels, and high-converting broadcast sequences that multiply customer lifetime value.",
    longDesc: "Email and WhatsApp are your highest-margin direct-to-consumer channels. We build sophisticated behavioral automations, abandoned checkout sequences, VIP loyalty triggers, and conversational WhatsApp bots that systematically generate revenue on autopilot.",
    icon: "Mail",
    features: [
      "Omnichannel Automated Retention Flows",
      "Official WhatsApp Business API & Chatbot Setup",
      "Klaviyo, Mailchimp & Brevo Workflow Architectures",
      "List Segmentation & Deliverability Warming",
      "Dynamic Product Recommendations & Personalization",
      "Interactive WhatsApp Catalog & One-Click Checkout",
    ],
    deliverables: [
      "Welcome, Browse Abandonment & Winback Automations",
      "Weekly High-Engagement Email Newsletters",
      "Broadcast Campaign Performance & Open Rate Optimization",
    ],
    faqs: [
      {
        question: "Can we message customers directly on WhatsApp?",
        answer: "Yes, through the official Meta WhatsApp Business API with pre-approved template messages, opt-in compliance, and green-tick verification support.",
      },
    ],
    seo: {
      metaTitle: "Email & WhatsApp Marketing Automation | RankZee",
      metaDescription: "Maximize retention and repeat purchases with automated email workflows and verified WhatsApp Business API solutions.",
      keywords: "email marketing agency, whatsapp marketing, klaviyo flows, retention marketing, whatsapp business api",
    },
    order: 6,
    published: true,
  },
  {
    slug: "web-design-development",
    title: "Web Design & High-Performance Development",
    shortDesc: "Ultra-fast Next.js & React web applications designed for conversion, seamless mobile experience, and perfect 90+ Lighthouse scores.",
    longDesc: "Your website is your 24/7 digital salesperson. We build bespoke, lightning-fast digital storefronts and web apps using Next.js, Tailwind CSS, and headless architectures with seamless CRM and payment gateway integrations. Zero bloat, instant loading, maximum conversion rate.",
    icon: "Code",
    features: [
      "Bespoke Next.js & React Modern Architectures",
      "Mobile-First Responsive UI/UX Design",
      "Sub-second Load Times (Core Web Vitals 95+)",
      "Headless CMS & CRM Integrations",
      "Payment Gateway (Razorpay/Stripe) Integration",
      "Continuous Deployment & Cloud Edge Hosting",
    ],
    deliverables: [
      "Figma UI/UX Prototypes & Component Design System",
      "Production-Grade Next.js App with Full Source Code",
      "Speed, Security, and Accessibility Compliance Audit",
    ],
    faqs: [
      {
        question: "How long does a custom website build take?",
        answer: "A standard high-performance marketing website takes 3 to 5 weeks from initial design prototyping to final staging deployment.",
      },
    ],
    seo: {
      metaTitle: "Custom Web Design & Next.js Development | RankZee",
      metaDescription: "Lightning-fast, conversion-obsessed web development. Next.js, Headless CMS, and mobile-first UX built for growth.",
      keywords: "web development agency, nextjs developers, responsive web design, custom website india, high conversion web design",
    },
    order: 7,
    published: true,
  },
  {
    slug: "branding-creative-identity",
    title: "Branding & Visual Identity",
    shortDesc: "Stand apart with distinct brand positioning, logos, design systems, and premium collateral that commands market respect.",
    longDesc: "A memorable brand earns premium pricing and consumer loyalty. We construct comprehensive visual identities: distinctive typography, iconography, tone-of-voice frameworks, and complete brand guidelines that resonate across both digital and physical touchpoints.",
    icon: "Palette",
    features: [
      "Brand Positioning & Core Narrative Strategy",
      "Logo Suite (Primary, Secondary, Monogram, Favicon)",
      "Color Palettes, Typography & Graphic Guidelines",
      "Pitch Deck & Marketing Collateral Templates",
      "Social Media Brand Kit & Digital Asset Packs",
      "Comprehensive Brand Identity Guidelines PDF",
    ],
    deliverables: [
      "Vector Brand Assets (SVG, PNG, PDF, Print-Ready)",
      "50+ Page Comprehensive Brand Manual",
      "Figma Design System & Token Library",
    ],
    faqs: [
      {
        question: "What do we receive at the end of the branding project?",
        answer: "You receive all source vector assets, export formats for web and print, typography files, and a comprehensive brand book governing all usage.",
      },
    ],
    seo: {
      metaTitle: "Brand Identity Design & Creative Strategy | RankZee",
      metaDescription: "Craft an unforgettable brand presence. Visual identity systems, logo design, and positioning by RankZee.",
      keywords: "branding agency, logo design, visual identity, brand guidelines, creative design agency",
    },
    order: 8,
    published: true,
  },
  {
    slug: "analytics-reporting-cro",
    title: "Analytics, CRO & Performance Reporting",
    shortDesc: "Actionable attribution, GA4 implementation, conversion rate optimization, and transparent ROI dashboards.",
    longDesc: "If you cannot measure it, you cannot scale it. We set up airtight multi-touch attribution, server-side GA4 events, heatmaps, and custom Looker Studio dashboards so you know exactly which channel, ad, and page is driving revenue.",
    icon: "BarChart3",
    features: [
      "Server-Side Google Analytics 4 (GA4) Architecture",
      "Google Tag Manager (GTM) Advanced Event Tracking",
      "Heatmaps, Session Recordings & Funnel Analysis",
      "A/B Testing & Conversion Rate Optimization (CRO)",
      "Custom Looker Studio Executive Dashboards",
      "Multi-Touch Channel Attribution Modeling",
    ],
    deliverables: [
      "Clean GA4 & GTM Event Architecture",
      "Live 24/7 Looker Studio Performance Dashboard",
      "Monthly Conversion Optimization Audit with Recommendations",
    ],
    faqs: [
      {
        question: "How do we view our marketing numbers?",
        answer: "We deliver a live, unified Looker Studio dashboard accessible 24/7 with real-time spend, cost per lead, organic rank, and revenue metrics.",
      },
    ],
    seo: {
      metaTitle: "Web Analytics & Conversion Rate Optimization (CRO) | RankZee",
      metaDescription: "Turn data into revenue with server-side GA4, custom dashboards, and conversion optimization by RankZee experts.",
      keywords: "web analytics agency, GA4 setup, CRO conversion rate optimization, looker studio dashboard, google tag manager",
    },
    order: 9,
    published: true,
  },
];


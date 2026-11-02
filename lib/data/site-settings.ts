export const siteSettings = {
  name: "RankZee",
  tagline: "The Modern Growth & Digital Dominance Engine",
  legalName: "RankZee Digital Solutions Private Limited",
  description: "RankZee is a premier technology-driven digital marketing agency specializing in Search Engine Optimization (SEO), Paid Ads (Google & Meta), High-Speed Next.js Web Development, and Growth Marketing.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rankzee.com",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "contact@rankzee.com",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "+919876543210",
  address: {
    street: "Cyber City Tech Park, Tower B, Sector 44",
    city: "Gurugram",
    state: "Haryana",
    postalCode: "122003",
    country: "India",
  },
  grievanceOfficer: {
    name: "Rajesh Malhotra",
    designation: "Head of Legal & Compliance",
    email: "grievance@rankzee.com",
    phone: "+91 98765 43219",
  },
  socials: {
    linkedin: "https://linkedin.com/company/rankzee",
    twitter: "https://twitter.com/rankzee_agency",
    instagram: "https://instagram.com/rankzee.agency",
    youtube: "https://youtube.com/@rankzee",
    github: "https://github.com/rankzee",
  },
  stats: [
    { label: "Target Keywords Ranked #1", value: 340, suffix: "+" },
    { label: "Average Client ROAS", value: 4.8, suffix: "x" },
    { label: "Organic Revenue Generated", value: 85, suffix: "Cr+" },
    { label: "Client Retention Rate", value: 96, suffix: "%" },
  ],
  whyRankZee: [
    {
      title: "Data-Obsessed Engineering",
      desc: "We treat marketing as an algorithmic science. No vanity metrics or guesswork—every rupee is tracked to bottom-line pipeline revenue.",
      icon: "Cpu",
    },
    {
      title: "Page 1 Google Dominance",
      desc: "Our technical SEO architecture and topical authority clusters systematically position your brand at the summit of commercial search intent.",
      icon: "TrendingUp",
    },
    {
      title: "Full-Funnel Creative Velocity",
      desc: "High-retention video hooks, dynamic ad variations, and psychological copywriting designed to convert cold audiences on Meta & Google.",
      icon: "Zap",
    },
    {
      title: "Sub-Second Next.js Technology",
      desc: "We build digital experiences with modern Jamstack & Next.js frameworks that achieve 95+ Core Web Vitals and zero bounce frustration.",
      icon: "ShieldCheck",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Deep Diagnostic Audit",
      desc: "We analyze your technical site health, search footprint, competitor vulnerabilities, and conversion bottlenecks.",
    },
    {
      step: "02",
      title: "Growth Roadmap & Keyword Architecture",
      desc: "We map high-intent commercial keywords, design creative testing sprints, and construct multi-channel paid funnels.",
    },
    {
      step: "03",
      title: "High-Velocity Execution",
      desc: "Deploy on-page fixes, build authority backlinks, launch optimized ad sets, and implement server-side tracking (GA4/CAPI).",
    },
    {
      step: "04",
      title: "Optimization & Scaling",
      desc: "Compound winning keywords, scale profitable ad spend, test conversion rate improvements, and deliver weekly transparent ROI reports.",
    },
  ],
  faqs: [
    {
      question: "What makes RankZee different from other digital marketing agencies?",
      answer: "Most agencies sell vanity metrics like impressions and clicks. At RankZee, we are senior growth engineers and performance marketers. We build high-speed Next.js web applications, optimize deep technical Core Web Vitals, implement server-side tracking, and tie our KPIs directly to closed revenue, qualified leads, and verifiable ROAS.",
    },
    {
      question: "How long does it take to see tangible results?",
      answer: "For Paid Ads (Google & Meta), we typically optimize CPA and achieve profitable ROAS within the first 14 to 21 days of creative testing. For Organic SEO, initial crawl momentum and keyword climbs appear in 45-60 days, with exponential revenue compounding between months 3 and 6.",
    },
    {
      question: "Do you work with startups as well as established enterprises?",
      answer: "Yes. Our Starter Velocity package is engineered for high-potential startups needing foundational Page 1 ranking and social credibility, while our Growth Dominance and Enterprise tiers serve scaled companies spending ₹5L+ monthly on paid acquisition.",
    },
    {
      question: "Will I have direct communication with the marketing team?",
      answer: "Absolutely. Every client is assigned a dedicated Growth Director and creative pod. You get direct access via a shared Slack channel, weekly strategy sprints, and a real-time 24/7 Looker Studio performance dashboard.",
    },
    {
      question: "What is your contract duration and cancellation policy?",
      answer: "We offer flexible 3-month and 6-month growth sprints. After the initial sprint, contracts operate on a transparent month-to-month basis with a 30-day notice period. No locked-in hostage clauses.",
    },
  ],
};


export interface TestimonialItem {
  id?: string;
  name: string;
  company: string;
  role: string;
  text: string;
  rating: number; // 1 to 5
  avatar: string;
  metric?: string;
  published: boolean;
}

export const sampleTestimonials: TestimonialItem[] = [
  {
    name: "Vikram Singhania",
    company: "PaySprint Global",
    role: "VP of Growth",
    text: "RankZee took our enterprise search presence from invisible to industry benchmark. The ROI on our organic pipeline has surpassed our paid channels by a factor of four.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    metric: "+480% Organic Traffic",
    published: true,
  },
  {
    name: "Pooja Mehta",
    company: "AuraThread Lifestyle",
    role: "Co-Founder",
    text: "The creative velocity RankZee brings is unmatched. They turned our Meta Ads into a predictable cash engine and scaled us to ₹92 Lakhs per month while keeping ROAS above 5x.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    metric: "5.2x Blended ROAS",
    published: true,
  },
  {
    name: "Rohan Varma",
    company: "CloudDesk Technologies",
    role: "Chief Revenue Officer",
    text: "RankZee understands B2B SaaS buyer psychology. We stopped burning budget on low-intent queries and started consistently filling our demo pipeline with Enterprise CTOs.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    metric: "+310% Enterprise SQLs",
    published: true,
  },
  {
    name: "Dr. Ananya Sen",
    company: "ArogyaPlus Medical",
    role: "Managing Director",
    text: "Their team rebuilt our entire web platform on Next.js. Page load time dropped under a second, mobile booking abandonment vanished, and patient consultations tripled.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    metric: "99/100 Lighthouse Score",
    published: true,
  },
  {
    name: "Sameer Kulkarni",
    company: "UrbanNest Realty",
    role: "Director of Marketing",
    text: "The localized SEO and hyper-targeted Google search ads delivered ultra-luxury home buyers that our in-house team simply couldn't tap. RankZee is an indispensable partner.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    metric: "₹14 Cr Inventory Sold",
    published: true,
  },
];


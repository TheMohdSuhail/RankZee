import { z } from "zod";

// Spam honeypot rule helper
export const honeypotSchema = z.string().max(0, { message: "Spam detected" }).optional();

// 1. Lead Form Schema
export const leadFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  company: z.string().max(100).optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select an estimated budget range"),
  message: z.string().min(10, "Please provide brief details (at least 10 characters)").max(2000),
  source: z.string().default("home_page"),
  honeypot: honeypotSchema,
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// 2. Consultation Form Schema
export const consultationFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  company: z.string().max(100).optional(),
  service: z.string().min(1, "Please select an area of focus"),
  date: z.string().min(1, "Please choose a preferred consultation date"),
  timeSlot: z.string().min(1, "Please choose a time slot"),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  notes: z.string().max(1000).optional(),
  honeypot: honeypotSchema,
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

// 3. Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  honeypot: honeypotSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// 4. Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  honeypot: honeypotSchema,
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// 5. User Profile Update Schema
export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().optional(),
  company: z.string().optional(),
  photoURL: z.string().url().optional().or(z.literal("")),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;

// 6. Service CMS Schema
export const serviceCmsSchema = z.object({
  slug: z.string().min(2).max(100),
  title: z.string().min(2).max(150),
  shortDesc: z.string().min(10).max(300),
  longDesc: z.string().min(20),
  icon: z.string().default("Sparkles"),
  features: z.array(z.string()).min(1),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).default([]),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional(),
  }).default({}),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export type ServiceCmsData = z.infer<typeof serviceCmsSchema>;

// 7. Portfolio CMS Schema
export const portfolioCmsSchema = z.object({
  slug: z.string().min(2).max(100),
  title: z.string().min(2).max(150),
  client: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  results: z.array(z.string()).min(1),
  images: z.array(z.string()).min(1),
  summary: z.string().min(10),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).default([]),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }).default({}),
  published: z.boolean().default(true),
});

export type PortfolioCmsData = z.infer<typeof portfolioCmsSchema>;

// 8. Blog CMS Schema
export const blogCmsSchema = z.object({
  slug: z.string().min(2).max(150),
  title: z.string().min(5).max(200),
  excerpt: z.string().min(10).max(400),
  content: z.string().min(50),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  author: z.string().default("RankZee Editorial Team"),
  readTime: z.string().default("5 min read"),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }).default({}),
  published: z.boolean().default(true),
});

export type BlogCmsData = z.infer<typeof blogCmsSchema>;


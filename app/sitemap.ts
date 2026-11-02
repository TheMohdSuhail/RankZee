import { MetadataRoute } from "next";
import { siteSettings } from "@/lib/data/site-settings";
import { sampleServices } from "@/lib/data/sample-services";
import { samplePortfolio } from "@/lib/data/sample-portfolio";
import { sampleBlogPosts } from "@/lib/data/sample-blog";
import { adminDb } from "@/lib/firebase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteSettings.url;
  const now = new Date();

  // 1. Static Public Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/blog",
    "/contact",
    "/book-consultation",
    "/terms-and-conditions",
    "/privacy-policy",
    "/refund-and-cancellation-policy",
    "/shipping-and-delivery-policy",
    "/disclaimer",
    "/cookie-policy",
    "/acceptable-use-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.7,
  }));

  // 2. Dynamic Service Slugs (Try Firestore, fallback to sampleServices)
  let serviceSlugs = sampleServices.map((s) => s.slug);
  try {
    const snap = await adminDb().collection("services").where("published", "==", true).get();
    if (!snap.empty) {
      serviceSlugs = snap.docs.map((d) => d.data().slug || d.id);
    }
  } catch {
    // fallback to static sample
  }

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic Portfolio Slugs
  let portfolioSlugs = samplePortfolio.map((p) => p.slug);
  try {
    const snap = await adminDb().collection("portfolio").where("published", "==", true).get();
    if (!snap.empty) {
      portfolioSlugs = snap.docs.map((d) => d.data().slug || d.id);
    }
  } catch {
    // fallback
  }

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Dynamic Blog Post Slugs
  let blogSlugs = sampleBlogPosts.map((b) => b.slug);
  try {
    const snap = await adminDb().collection("blogPosts").where("published", "==", true).get();
    if (!snap.empty) {
      blogSlugs = snap.docs.map((d) => d.data().slug || d.id);
    }
  } catch {
    // fallback
  }

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}


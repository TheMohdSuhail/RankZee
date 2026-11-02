import { MetadataRoute } from "next";
import { siteSettings } from "@/lib/data/site-settings";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteSettings.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/dashboard",
          "/dashboard/*",
          "/api/*",
          "/payment/*",
          "/login",
          "/signup",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


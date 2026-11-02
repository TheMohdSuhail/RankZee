import React from "react";
import { siteSettings } from "@/lib/data/site-settings";

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "Service" | "Article" | "FAQPage" | "LocalBusiness";
  data?: Record<string, any>;
}

export function StructuredData({ type = "Organization", data = {} }: StructuredDataProps) {
  let schema: Record<string, any> = {};

  if (type === "Organization" || type === "LocalBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteSettings.url}/#organization`,
      name: siteSettings.name,
      legalName: siteSettings.legalName,
      url: siteSettings.url,
      logo: `${siteSettings.url}/logo.png`,
      description: siteSettings.description,
      email: siteSettings.email,
      telephone: siteSettings.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteSettings.address.street,
        addressLocality: siteSettings.address.city,
        addressRegion: siteSettings.address.state,
        postalCode: siteSettings.address.postalCode,
        addressCountry: siteSettings.address.country,
      },
      sameAs: [
        siteSettings.socials.linkedin,
        siteSettings.socials.twitter,
        siteSettings.socials.instagram,
        siteSettings.socials.youtube,
      ],
      priceRange: "₹₹₹",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "86",
      },
      ...data,
    };
  } else if (type === "WebSite") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteSettings.url}/#website`,
      name: siteSettings.name,
      url: siteSettings.url,
      description: siteSettings.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteSettings.url}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      ...data,
    };
  } else if (type === "FAQPage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs?.map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })) || [],
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


import type { Metadata, Viewport } from "next";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/lib/firebase/auth-context";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { AnalyticsTracker } from "@/components/seo/analytics-tracker";
import { StructuredData } from "@/components/seo/structured-data";
import { siteSettings } from "@/lib/data/site-settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080b12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.url),
  title: {
    default: "RankZee | #1 Digital Marketing & High-Growth SEO Agency",
    template: "%s | RankZee Digital Marketing Agency",
  },
  description: siteSettings.description,
  keywords: [
    "digital marketing agency",
    "SEO services india",
    "rank #1 google",
    "Google ads management",
    "meta ads scaling",
    "next.js web development",
    "growth marketing agency",
    "PPC agency",
    "CRO optimization",
  ],
  authors: [{ name: "RankZee Growth Team", url: siteSettings.url }],
  creator: "RankZee Digital Solutions",
  publisher: "RankZee Digital Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteSettings.url,
    title: "RankZee | The Modern Growth & Digital Dominance Engine",
    description: siteSettings.description,
    siteName: "RankZee",
    images: [
      {
        url: "/api/og?title=Dominate+Google+Search&desc=Data-Obsessed+Digital+Marketing+Agency",
        width: 1200,
        height: 630,
        alt: "RankZee Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankZee | #1 Digital Marketing Agency",
    description: siteSettings.description,
    creator: "@rankzee_agency",
    images: ["/api/og?title=RankZee+Digital+Marketing"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google_site_verification_placeholder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-slate-100 min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              {/* Structured Data: Organization & Website JSON-LD */}
              <StructuredData type="Organization" />
              <StructuredData type="WebSite" />

              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />

              {/* Cookie Consent Banner & Privacy Controller */}
              <CookieBanner />

              {/* Analytics Script Loader (loads GA4 / Meta Pixel only upon user consent) */}
              <AnalyticsTracker />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


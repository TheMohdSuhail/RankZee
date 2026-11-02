"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export function AnalyticsTracker() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);
  const [canLoadMarketing, setCanLoadMarketing] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem("rankzee-cookie-consent");
        if (stored) {
          const parsed = JSON.parse(stored);
          setCanLoadAnalytics(Boolean(parsed.analytics));
          setCanLoadMarketing(Boolean(parsed.marketing));
        }
      } catch {
        // ignore
      }
    };

    checkConsent();

    const handleConsentUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setCanLoadAnalytics(Boolean(detail.analytics));
        setCanLoadMarketing(Boolean(detail.marketing));
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
  }, []);

  return (
    <>
      {/* Google Analytics 4 (Only after user consent) */}
      {canLoadAnalytics && gaId && gaId !== "G-XXXXXXXXXX" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Only after user marketing consent) */}
      {canLoadMarketing && pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}


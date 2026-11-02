import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "RankZee Digital Marketing Agency";
    const desc = searchParams.get("desc") || "Dominate Google Page 1 with Technical SEO, High-ROAS Paid Ads & Next.js Platforms";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#080b12",
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(0, 102, 255, 0.25) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 245, 255, 0.2) 0%, transparent 50%)",
            padding: "60px 80px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Brand header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0066FF, #00F5FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "900",
                fontSize: "24px",
              }}
            >
              #1
            </div>
            <span style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-1px" }}>
              Rank<span style={{ color: "#00F5FF" }}>Zee</span>
            </span>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#ffffff",
                lineHeight: "1.15",
                letterSpacing: "-1.5px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#94a3b8",
                lineHeight: "1.4",
              }}
            >
              {desc}
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "24px",
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            <span>rankzee.com</span>
            <span style={{ color: "#00F5FF" }}>The Modern Growth & SEO Engine</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}


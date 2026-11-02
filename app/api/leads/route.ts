import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validators/schemas";
import { adminDb } from "@/lib/firebase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { allowed } = checkRateLimit(ip, 5, 60000); // 5 submissions per minute per IP

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    const validation = leadFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const db = adminDb();

    const newLead = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      company: data.company?.trim() || "N/A",
      service: data.service,
      budget: data.budget,
      message: data.message.trim(),
      source: data.source || "website_lead_form",
      status: "new",
      notes: [],
      ipAddress: ip,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("leads").add(newLead);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Your inquiry has been registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead inquiry. Please try again later." },
      { status: 500 }
    );
  }
}


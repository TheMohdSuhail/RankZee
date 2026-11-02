import { NextRequest, NextResponse } from "next/server";
import { consultationFormSchema } from "@/lib/validators/schemas";
import { adminDb } from "@/lib/firebase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { allowed } = checkRateLimit(ip, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few moments." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    const validation = consultationFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const db = adminDb();

    const consultationDoc = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      company: data.company?.trim() || "N/A",
      service: data.service,
      date: data.date,
      timeSlot: data.timeSlot,
      websiteUrl: data.websiteUrl || "",
      notes: data.notes?.trim() || "",
      status: "pending", // pending | confirmed | completed | cancelled
      createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("consultations").add(consultationDoc);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Consultation booked successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/consultations error:", error);
    return NextResponse.json(
      { error: "Failed to book consultation." },
      { status: 500 }
    );
  }
}


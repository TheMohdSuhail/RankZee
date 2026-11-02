import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators/schemas";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const email = validation.data.email.toLowerCase().trim();
    const db = adminDb();

    // Check if email already subscribed
    const existing = await db.collection("newsletter").where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ success: true, message: "Already subscribed." }, { status: 200 });
    }

    await db.collection("newsletter").add({
      email,
      subscribedAt: FieldValue.serverTimestamp(),
      active: true,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("API /api/newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}


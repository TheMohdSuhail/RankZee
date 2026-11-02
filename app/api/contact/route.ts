import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators/schemas";
import { adminDb } from "@/lib/firebase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { allowed } = checkRateLimit(ip, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a bit before sending another." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const db = adminDb();

    const contactDoc = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim() || "",
      subject: data.subject.trim(),
      message: data.message.trim(),
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("contactMessages").add(contactDoc);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Your message has been sent.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}


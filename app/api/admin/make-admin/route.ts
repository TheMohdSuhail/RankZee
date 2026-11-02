import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const { email, uid, secretKey } = await req.json();

    // Verify setup secret or existing admin token
    const setupSecret = process.env.ADMIN_SETUP_SECRET || "rankzee_master_setup_secret_2025";
    if (secretKey !== setupSecret) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const auth = adminAuth();
    const db = adminDb();

    let targetUid = uid;
    if (!targetUid && email) {
      const userRecord = await auth.getUserByEmail(email);
      targetUid = userRecord.uid;
    }

    if (!targetUid) {
      return NextResponse.json({ error: "User email or UID is required." }, { status: 400 });
    }

    // Set custom claim
    await auth.setCustomUserClaims(targetUid, {
      admin: true,
      role: "admin",
    });

    // Update in Firestore users collection
    await db.collection("users").doc(targetUid).set(
      {
        role: "admin",
        isAdmin: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: `User ${targetUid} successfully promoted to Admin with custom claim admin: true.`,
    });
  } catch (error: any) {
    console.error("Make admin error:", error);
    return NextResponse.json({ error: error.message || "Failed to make admin." }, { status: 500 });
  }
}


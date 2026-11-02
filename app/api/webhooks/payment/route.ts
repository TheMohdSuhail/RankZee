import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Payment Webhook Handler
 * Readiness placeholder for Razorpay & Stripe webhooks with signature verification
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-razorpay-signature") ||
      req.headers.get("stripe-signature") ||
      "";

    const providerType = req.headers.get("x-razorpay-signature") ? "razorpay" : "stripe";
    const provider = getPaymentProvider(providerType);

    // TODO: Verify webhook cryptographic signature against webhook secrets
    // Example Razorpay:
    // const expectedSig = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest('hex');
    // if (expectedSig !== signature) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    const result = await provider.handleWebhook(rawBody, signature);

    if (result.orderId && result.status === "paid") {
      const db = adminDb();
      await db.collection("orders").doc(result.orderId).set(
        {
          status: "paid",
          paidAt: FieldValue.serverTimestamp(),
          webhookEvent: result.event,
        },
        { merge: true }
      );
    }

    return NextResponse.json({ received: true, status: result.status });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}


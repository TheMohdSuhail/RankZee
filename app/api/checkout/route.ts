import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider, PaymentProviderType } from "@/lib/payments";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = "guest_user",
      userEmail = "guest@rankzee.com",
      userName = "Guest User",
      planId,
      planName,
      amount,
      currency = "INR",
      provider = "razorpay",
    } = body;

    if (!planId || !amount) {
      return NextResponse.json({ error: "Missing required order parameters." }, { status: 400 });
    }

    const paymentProvider = getPaymentProvider(provider as PaymentProviderType);

    // Call payment provider abstraction (Razorpay / Stripe)
    const orderResult = await paymentProvider.createOrder({
      userId,
      userEmail,
      userName,
      planId,
      planName,
      amount: Number(amount),
      currency,
    });

    // Create an orders document in Firestore with status 'pending'
    const db = adminDb();
    const orderDoc = {
      orderId: orderResult.orderId,
      provider: orderResult.provider,
      providerOrderId: orderResult.providerOrderId,
      userId,
      userEmail,
      userName,
      planId,
      planName,
      amount: Number(amount),
      currency,
      status: "pending", // pending | paid | failed
      paymentId: "",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await db.collection("orders").doc(orderResult.orderId).set(orderDoc);

    return NextResponse.json({
      success: true,
      order: orderResult,
      checkoutUrl: orderResult.checkoutUrl || `/payment/success?order_id=${orderResult.orderId}&provider=${provider}`,
    });
  } catch (error: any) {
    console.error("API /api/checkout error:", error);
    return NextResponse.json({ error: error.message || "Failed to initiate checkout." }, { status: 500 });
  }
}


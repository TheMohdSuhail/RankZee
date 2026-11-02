import {
  PaymentProvider,
  CreateOrderParams,
  PaymentOrderResult,
  VerifyPaymentParams,
  VerifyPaymentResult,
  WebhookResult,
} from "./types";

/**
 * Razorpay Payment Provider Stub
 * Production readiness: Ready for Razorpay Node SDK integration.
 */
export class RazorpayProvider implements PaymentProvider {
  name = "razorpay" as const;

  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholderKey123";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholderSecret456";
  }

  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    // TODO: In production, instantiate `new Razorpay({ key_id, key_secret })`
    // const rzpOrder = await razorpay.orders.create({
    //   amount: Math.round(params.amount * 100), // Razorpay accepts amounts in paise
    //   currency: params.currency || "INR",
    //   receipt: `rcpt_${Date.now()}`,
    //   notes: { userId: params.userId, planId: params.planId },
    // });
    const simulatedOrderId = `order_rzp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return {
      orderId: `ord_${Date.now()}`,
      provider: "razorpay",
      providerOrderId: simulatedOrderId,
      amount: params.amount,
      currency: params.currency || "INR",
      keyId: this.keyId,
    };
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    // TODO: Verify HMAC SHA256 signature in production:
    // const body = params.orderId + "|" + params.paymentId;
    // const expectedSignature = crypto.createHmac("sha256", this.keySecret).update(body).digest("hex");
    // const isValid = expectedSignature === params.signature;

    const isValid = Boolean(params.paymentId && params.orderId);
    return {
      success: isValid,
      orderId: params.orderId,
      paymentId: params.paymentId,
      status: isValid ? "paid" : "failed",
      message: isValid ? "Payment verified successfully" : "Signature mismatch or invalid payment id",
    };
  }

  async handleWebhook(rawBody: string, signature: string): Promise<WebhookResult> {
    // TODO: In production, verify webhook signature using crypto:
    // crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest('hex') === signature
    try {
      const payload = JSON.parse(rawBody);
      return {
        received: true,
        event: payload.event || "payment.captured",
        orderId: payload.payload?.payment?.entity?.order_id,
        status: payload.event === "payment.captured" ? "paid" : "pending",
      };
    } catch {
      return {
        received: false,
        event: "parse_error",
      };
    }
  }
}


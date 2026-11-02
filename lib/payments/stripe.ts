import {
  PaymentProvider,
  CreateOrderParams,
  PaymentOrderResult,
  VerifyPaymentParams,
  VerifyPaymentResult,
  WebhookResult,
} from "./types";

/**
 * Stripe Payment Provider Stub
 * Production readiness: Ready for Stripe Node SDK integration.
 */
export class StripeProvider implements PaymentProvider {
  name = "stripe" as const;

  private publishableKey: string;
  private secretKey: string;

  constructor() {
    this.publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder";
    this.secretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
  }

  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    // TODO: In production, instantiate `new Stripe(secretKey)` and create checkout session:
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{ price_data: { currency: 'inr', unit_amount: params.amount * 100, product_data: { name: params.planName } }, quantity: 1 }],
    //   mode: 'payment',
    //   success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${siteUrl}/payment/failed`,
    // });
    const simulatedSessionId = `cs_test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return {
      orderId: `ord_${Date.now()}`,
      provider: "stripe",
      providerOrderId: simulatedSessionId,
      amount: params.amount,
      currency: params.currency || "INR",
      checkoutUrl: `/payment/success?order_id=ord_${Date.now()}&provider=stripe`,
      keyId: this.publishableKey,
    };
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    // TODO: In production:
    // const session = await stripe.checkout.sessions.retrieve(params.sessionId);
    // const isPaid = session.payment_status === 'paid';
    const isValid = Boolean(params.paymentId || params.sessionId);
    return {
      success: isValid,
      orderId: params.orderId,
      paymentId: params.paymentId || params.sessionId || "pi_simulated_success",
      status: isValid ? "paid" : "failed",
      message: isValid ? "Stripe payment verified" : "Payment failed or incomplete",
    };
  }

  async handleWebhook(rawBody: string, signature: string): Promise<WebhookResult> {
    // TODO: In production:
    // const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    try {
      const payload = JSON.parse(rawBody);
      return {
        received: true,
        event: payload.type || "checkout.session.completed",
        orderId: payload.data?.object?.metadata?.orderId,
        status: "paid",
      };
    } catch {
      return {
        received: false,
        event: "parse_error",
      };
    }
  }
}


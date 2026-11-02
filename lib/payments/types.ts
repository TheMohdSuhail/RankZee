export type PaymentProviderType = "razorpay" | "stripe";

export interface CreateOrderParams {
  userId: string;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  amount: number; // in primary currency (e.g. INR or USD)
  currency: string; // 'INR' | 'USD'
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  orderId: string;
  provider: PaymentProviderType;
  providerOrderId: string;
  amount: number;
  currency: string;
  checkoutUrl?: string;
  keyId?: string;
}

export interface VerifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature?: string; // Razorpay signature
  sessionId?: string; // Stripe checkout session ID
}

export interface VerifyPaymentResult {
  success: boolean;
  orderId: string;
  paymentId: string;
  status: "paid" | "failed" | "pending";
  message?: string;
}

export interface WebhookResult {
  received: boolean;
  event: string;
  orderId?: string;
  status?: string;
}

export interface PaymentProvider {
  name: PaymentProviderType;
  createOrder(params: CreateOrderParams): Promise<PaymentOrderResult>;
  verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult>;
  handleWebhook(rawBody: string, signature: string): Promise<WebhookResult>;
}


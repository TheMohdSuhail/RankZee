import { PaymentProvider, PaymentProviderType } from "./types";
import { RazorpayProvider } from "./razorpay";
import { StripeProvider } from "./stripe";

const providers: Record<PaymentProviderType, PaymentProvider> = {
  razorpay: new RazorpayProvider(),
  stripe: new StripeProvider(),
};

export function getPaymentProvider(providerName: PaymentProviderType = "razorpay"): PaymentProvider {
  const provider = providers[providerName];
  if (!provider) {
    throw new Error(`Unsupported payment provider: ${providerName}`);
  }
  return provider;
}

export * from "./types";


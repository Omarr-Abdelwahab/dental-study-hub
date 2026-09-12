import type { PaymentStatus } from "./types";

/**
 * Mock payment service.
 *
 * This module is the single seam where a hosted Paymob checkout (or any other
 * gateway) can replace the simulated flow later. Keep the signatures stable:
 * `createPayment` should return a transaction reference plus a final status,
 * and a real implementation would instead redirect to a hosted payment page
 * and confirm via webhook.
 */
export interface PaymentIntent {
  courseId: string;
  userId: string;
  amount: number;
  currency: string;
  /** Demo-only knob so the UI can showcase success / pending / failed states. */
  simulate?: PaymentStatus;
}

export interface PaymentResult {
  txnId: string;
  status: PaymentStatus;
  method: string;
  message: string;
}

const messages: Record<PaymentStatus, string> = {
  success: "Demo payment approved. Enrollment activated.",
  pending: "Demo payment is pending review. Access starts once it clears.",
  failed: "Demo payment was declined. No money was moved — this is a demo.",
};

export async function createPayment(intent: PaymentIntent): Promise<PaymentResult> {
  await new Promise((resolve) => setTimeout(resolve, 1600));
  const status: PaymentStatus = intent.simulate ?? "success";
  return {
    txnId: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status,
    method: "Demo Card",
    message: messages[status],
  };
}

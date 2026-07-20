export interface PaymentResult {
  success: boolean;
  reservationId: string;
  seatNumber: string;
  amount: number;
  paidAt: number;
}

export interface MockPaymentPayload {
  reservationId: string;
}

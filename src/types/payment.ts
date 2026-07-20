export interface PaymentResult {
  success: boolean;
  reservationId: string;
  seatNumber: string;
  amount: number;
  paidAt: number;
}

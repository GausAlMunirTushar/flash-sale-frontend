import { SEAT_PRICE } from "@/constants/seat";
import { releaseLock } from "@/services/seat.service";
import type { Reservation } from "@/types/reservation";
import type { PaymentResult } from "@/types/payment";

export async function payMock(reservation: Reservation): Promise<PaymentResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  releaseLock(true);

  return {
    success: true,
    reservationId: reservation.id,
    seatNumber: reservation.seatNumber,
    amount: SEAT_PRICE,
    paidAt: Date.now(),
  };
}

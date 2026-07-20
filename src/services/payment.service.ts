import api from '@/lib/api';
import { SEAT_PRICE } from '@/constants/seat';
import type { Reservation } from '@/types/reservation';
import type { PaymentResult } from '@/types/payment';

export async function payMock(reservation: Reservation): Promise<PaymentResult> {
  const { data } = await api.post('/payments/mock', {
    reservationId: reservation.id,
  });

  return {
    success: true,
    reservationId: data.id,
    seatNumber: data.seatNumber,
    amount: SEAT_PRICE,
    paidAt: Date.now(),
  };
}

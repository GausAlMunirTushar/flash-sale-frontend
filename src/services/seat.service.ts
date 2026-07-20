import api from '@/lib/api';
import type { BackendSeat, BackendSeatStats, Seat, SeatStats } from '@/types/seat';
import { toFrontendSeat } from '@/types/seat';

export async function getSeatMap(): Promise<Seat[]> {
  const { data } = await api.get<BackendSeat[]>('/seats');
  return data.map(toFrontendSeat);
}

export async function getSeatStats(): Promise<SeatStats> {
  const { data } = await api.get<BackendSeatStats>('/seats/statistics');
  return {
    ...data,
    viewing: 0,
    avgReservationSeconds: 0,
  };
}

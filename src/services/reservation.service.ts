import api from '@/lib/api';
import type { BackendReservation, Reservation } from '@/types/reservation';

export async function createReservation(seatId: string, phone?: string): Promise<Reservation> {
  const { data } = await api.post<BackendReservation>('/reservations', { seatId, phone });
  return toFrontendReservation(data);
}

export async function findMyReservation(): Promise<Reservation | null> {
  try {
    const { data } = await api.get<BackendReservation | null>('/reservations/me');
    return data ? toFrontendReservation(data) : null;
  } catch {
    return null;
  }
}

export async function cancelReservation(reservationId: string): Promise<void> {
  await api.delete(`/reservations/${reservationId}`);
}

function toFrontendReservation(r: BackendReservation): Reservation {
  return {
    id: r.id,
    seatNumber: r.seatNumber,
    reservationCode: r.reservationCode,
    status: r.status,
    expiresAt: new Date(r.expiresAt).getTime(),
    createdAt: new Date(r.createdAt).getTime(),
    paidAt: r.paidAt ? new Date(r.paidAt).getTime() : null,
    phone: r.phone,
  };
}

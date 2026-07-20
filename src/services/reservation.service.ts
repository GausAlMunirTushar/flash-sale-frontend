import { HOLD_DURATION_SECONDS } from "@/constants/reservation";
import { lockSeat, releaseSeat } from "@/services/seat.service";
import type { Reservation } from "@/types/reservation";

export async function createReservation(seatId: string): Promise<Reservation> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seat = lockSeat(seatId);
  if (!seat) {
    throw new Error("Seat is no longer available");
  }

  const createdAt = Date.now();

  return {
    id: `RSV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    seatNumber: seat.id,
    createdAt,
    expiresAt: createdAt + HOLD_DURATION_SECONDS * 1000,
  };
}

export async function cancelReservation(seatId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  releaseSeat(seatId, false);
}

export function expireReservation(seatId: string): void {
  releaseSeat(seatId, false);
}

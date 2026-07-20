import { HOLD_DURATION_SECONDS } from "@/constants/reservation";
import { registerLock, releaseLock } from "@/services/seat.service";
import type { Reservation } from "@/types/reservation";

function randomSeatNumber() {
  const row = String.fromCharCode(65 + Math.floor(Math.random() * 6));
  const num = 1 + Math.floor(Math.random() * 12);
  return `${row}${num}`;
}

export async function createReservation(): Promise<Reservation> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  registerLock();
  const createdAt = Date.now();

  return {
    id: `RSV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    seatNumber: randomSeatNumber(),
    createdAt,
    expiresAt: createdAt + HOLD_DURATION_SECONDS * 1000,
  };
}

export async function cancelReservation(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  releaseLock(false);
}

export async function expireReservation(): Promise<void> {
  releaseLock(false);
}

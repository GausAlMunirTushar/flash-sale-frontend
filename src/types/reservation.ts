export type ReservationPhase =
  | "idle"
  | "reserving"
  | "holding"
  | "paying"
  | "success"
  | "expired"
  | "soldOut";

export interface Reservation {
  id: string;
  seatNumber: string;
  expiresAt: number;
  createdAt: number;
  reservationCode: string;
  status: string;
  paidAt: number | null;
}

export interface BackendReservation {
  id: string;
  reservationCode: string;
  seatId: string;
  seatNumber: string;
  status: 'LOCKED' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  expiresAt: string;
  paidAt: string | null;
  createdAt: string;
}

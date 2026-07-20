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
}

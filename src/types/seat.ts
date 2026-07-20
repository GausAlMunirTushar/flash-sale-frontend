export interface SeatStats {
  total: number;
  available: number;
  locked: number;
  sold: number;
  viewing: number;
  avgReservationSeconds: number;
}

export type SeatStatus = "available" | "reserved" | "lockedByMe" | "sold";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

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
  seatNumber: string;
  expiresAt: string | null;
}

export interface BackendSeat {
  id: string;
  seatNumber: string;
  row: string;
  number: number;
  status: 'AVAILABLE' | 'LOCKED' | 'PURCHASED';
  expiresAt: string | null;
}

export interface BackendSeatStats {
  total: number;
  available: number;
  locked: number;
  sold: number;
}

export function toFrontendSeat(seat: BackendSeat): Seat {
  const statusMap: Record<string, SeatStatus> = {
    AVAILABLE: 'available',
    LOCKED: 'reserved',
    PURCHASED: 'sold',
  };
  return {
    id: seat.id,
    seatNumber: seat.seatNumber,
    row: seat.row,
    number: seat.number,
    status: statusMap[seat.status] || 'available',
    expiresAt: seat.expiresAt,
  };
}

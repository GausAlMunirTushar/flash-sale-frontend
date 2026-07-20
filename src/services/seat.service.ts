import { SEAT_ROWS, SEATS_PER_ROW, TOTAL_SEATS } from "@/constants/seat";
import type { Seat, SeatStats, SeatStatus } from "@/types/seat";

const INITIAL_SOLD = 10;
const INITIAL_RESERVED = 23;

function buildInitialSeats(): Seat[] {
  const seats: Seat[] = [];
  for (const row of SEAT_ROWS) {
    for (let number = 1; number <= SEATS_PER_ROW; number += 1) {
      seats.push({ id: `${row}-${number}`, row, number, status: "available" });
    }
  }

  // Deterministic spread (not random) so the demo always shows a believable mix.
  let soldLeft = INITIAL_SOLD;
  let reservedLeft = INITIAL_RESERVED;
  for (let i = 0; i < seats.length && (soldLeft > 0 || reservedLeft > 0); i += 3) {
    if (soldLeft > 0) {
      seats[i].status = "sold";
      soldLeft -= 1;
    }
    if (reservedLeft > 0 && i + 1 < seats.length) {
      seats[i + 1].status = "reserved";
      reservedLeft -= 1;
    }
  }

  return seats;
}

const seats: Seat[] = buildInitialSeats();
let viewing = 220 + Math.floor(Math.random() * 60);

function countByStatus(status: SeatStatus) {
  return seats.filter((seat) => seat.status === status).length;
}

export async function getSeatMap(): Promise<Seat[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Light "someone else is browsing" simulation so the map feels alive.
  viewing = Math.max(180, viewing + Math.floor(Math.random() * 11) - 5);

  return seats.map((seat) => ({ ...seat }));
}

export async function getSeatStats(): Promise<SeatStats> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    total: TOTAL_SEATS,
    available: countByStatus("available"),
    locked: countByStatus("reserved") + countByStatus("lockedByMe"),
    sold: countByStatus("sold"),
    viewing,
    avgReservationSeconds: 262,
  };
}

export function lockSeat(seatId: string): Seat | null {
  const seat = seats.find((item) => item.id === seatId);
  if (!seat || seat.status !== "available") return null;

  seat.status = "lockedByMe";
  return { ...seat };
}

export function releaseSeat(seatId: string, sold: boolean) {
  const seat = seats.find((item) => item.id === seatId);
  if (!seat) return;

  seat.status = sold ? "sold" : "available";
}

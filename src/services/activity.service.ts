import { SEAT_ROWS, SEATS_PER_ROW } from "@/constants/seat";
import type { ActivityEvent, ActivityType } from "@/types/activity";

const TEMPLATES: { type: ActivityType; message: (seat: string) => string }[] = [
  { type: "purchased", message: (seat) => `Someone purchased seat ${seat}` },
  { type: "reserved", message: (seat) => `Seat ${seat} has just been reserved` },
  { type: "payment", message: (seat) => `Payment completed for seat ${seat}` },
  { type: "released", message: (seat) => `Seat ${seat} is now available` },
];

function randomSeat() {
  const row = SEAT_ROWS[Math.floor(Math.random() * SEAT_ROWS.length)];
  const number = 1 + Math.floor(Math.random() * SEATS_PER_ROW);
  return `${row}-${number}`;
}

export function generateActivityEvent(): ActivityEvent {
  const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  const seatNumber = randomSeat();

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: template.type,
    seatNumber,
    message: template.message(seatNumber),
    createdAt: Date.now(),
  };
}

export function generateInitialActivity(count: number): ActivityEvent[] {
  return Array.from({ length: count }, (_, i) => ({
    ...generateActivityEvent(),
    createdAt: Date.now() - (i + 1) * 15000,
  }));
}

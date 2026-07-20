export type ActivityType = "purchased" | "reserved" | "released" | "payment";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  message: string;
  seatNumber: string;
  createdAt: number;
}

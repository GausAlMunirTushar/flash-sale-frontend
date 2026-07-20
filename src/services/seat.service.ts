import { TOTAL_SEATS } from "@/constants/seat";
import type { SeatStats } from "@/types/seat";

let sold = 33;
let locked = 0;

export function registerLock() {
  locked += 1;
}

export function releaseLock(convertedToSale: boolean) {
  locked = Math.max(0, locked - 1);
  if (convertedToSale) sold = Math.min(TOTAL_SEATS, sold + 1);
}

export async function getSeatStats(): Promise<SeatStats> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const available = Math.max(0, TOTAL_SEATS - sold - locked);
  const viewing = 40 + Math.floor(Math.random() * 35);

  return { total: TOTAL_SEATS, available, locked, sold, viewing };
}

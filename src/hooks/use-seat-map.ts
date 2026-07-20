import { useQuery } from "@tanstack/react-query";
import { getSeatMap } from "@/services/seat.service";

const REFETCH_INTERVAL_MS = 5000;

export function useSeatMap() {
  return useQuery({
    queryKey: ["seat-map"],
    queryFn: getSeatMap,
    refetchInterval: REFETCH_INTERVAL_MS,
    retry: 3,
    staleTime: 2000,
  });
}

export const SEAT_MAP_REFETCH_SECONDS = REFETCH_INTERVAL_MS / 1000;

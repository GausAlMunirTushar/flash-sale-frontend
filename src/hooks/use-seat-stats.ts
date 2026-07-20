import { useQuery } from "@tanstack/react-query";
import { getSeatStats } from "@/services/seat.service";

export function useSeatStats() {
  return useQuery({
    queryKey: ["seat-stats"],
    queryFn: getSeatStats,
    refetchInterval: 4000,
    retry: 3,
    staleTime: 2000,
  });
}

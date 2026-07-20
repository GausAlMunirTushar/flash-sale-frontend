"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshCountdown } from "@/hooks/use-refresh-countdown";
import { useSeatMap } from "@/hooks/use-seat-map";
import { cn } from "@/lib/utils";
import type { SeatStatus } from "@/types/seat";

const REFRESH_INTERVAL_SECONDS = 5;

const LEGEND: { status: SeatStatus; label: string; dot: string }[] = [
  { status: "available", label: "Available", dot: "bg-success" },
  { status: "reserved", label: "Reserved", dot: "bg-urgency-amber" },
  { status: "lockedByMe", label: "Locked (You)", dot: "bg-urgency-blue" },
  { status: "sold", label: "Sold", dot: "bg-muted-foreground/40" },
];

const SEAT_STYLES: Record<SeatStatus, string> = {
  available:
    "border-success/30 bg-success/10 text-success hover:bg-success/20 hover:border-success/50 cursor-pointer",
  reserved: "border-urgency-amber/30 bg-urgency-amber/10 text-urgency-amber cursor-not-allowed",
  lockedByMe: "border-urgency-blue bg-urgency-blue text-white cursor-default",
  sold: "border-border bg-muted text-muted-foreground/40 cursor-not-allowed",
};

interface SeatGridProps {
  onSelectSeat: (seatId: string) => void;
  selectionDisabled: boolean;
}

export function SeatGrid({ onSelectSeat, selectionDisabled }: SeatGridProps) {
  const { data: seats, isLoading, isError, error } = useSeatMap();
  const refreshIn = useRefreshCountdown(REFRESH_INTERVAL_SECONDS);

  if (isError) {
    return (
      <Card className="rounded-xl border-border">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <p className="font-semibold">Failed to load seats</p>
          <p className="text-sm text-muted-foreground">{error?.message || "Could not connect to server"}</p>
        </CardContent>
      </Card>
    );
  }

  const rows = seats
    ? Array.from(new Set(seats.map((seat) => seat.row))).sort()
    : [];

  return (
      <Card className="rounded-xl border-border">
      <CardHeader className="flex-col items-start gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">Choose Your Seat</p>
          <p className="text-sm text-muted-foreground">
            {seats && seats.length === 0
              ? "No seats available at the moment."
              : "Click on any available seat to reserve it for 5 minutes."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {LEGEND.map((item) => (
            <span key={item.status} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", item.dot)} />
              {item.label}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-6">
        {isLoading || !seats ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          rows.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-4 shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
              <div className="grid flex-1 grid-cols-10 gap-1.5 sm:gap-2">
                {seats
                  .filter((seat) => seat.row === row)
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => {
                    const isClickable = seat.status === "available" && !selectionDisabled;
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={!isClickable}
                        onClick={() => onSelectSeat(seat.id)}
                        aria-label={`Seat ${seat.id} — ${seat.status}`}
                        className={cn(
                          "flex h-9 min-h-[44px] items-center justify-center rounded-lg border text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:h-9 sm:min-h-0",
                          SEAT_STYLES[seat.status]
                        )}
                      >
                        {seat.number}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))
        )}

        <div className="flex items-center justify-center gap-1.5 pt-2 text-xs text-muted-foreground">
          <RefreshCw className="size-3" />
          Auto refresh in {refreshIn}s
        </div>
      </CardContent>
    </Card>
  );
}

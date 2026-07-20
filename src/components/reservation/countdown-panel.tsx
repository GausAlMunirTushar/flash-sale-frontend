"use client";

import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "@/components/shared/circular-progress";
import type { CountdownZone } from "@/hooks/use-countdown";
import { formatCountdown } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Reservation } from "@/types/reservation";

const ZONE_TEXT: Record<CountdownZone, string> = {
  blue: "text-urgency-blue",
  amber: "text-urgency-amber",
  red: "text-urgency-red",
};

interface CountdownPanelProps {
  reservation: Reservation;
  remainingSeconds: number;
  zone: CountdownZone;
  progress: number;
  isPulsing: boolean;
  isPaying: boolean;
  onPay: () => void;
  onCancel: () => void;
}

export function CountdownPanel({
  reservation,
  remainingSeconds,
  zone,
  progress,
  isPulsing,
  isPaying,
  onPay,
  onCancel,
}: CountdownPanelProps) {
  return (
    <motion.div
      key="countdown-panel"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 pt-6 text-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              Reservation <span className="font-medium text-foreground">{reservation.id}</span>
            </span>
            <span aria-hidden>&middot;</span>
            <span>
              Seat <span className="font-medium text-foreground">{reservation.seatNumber}</span>
            </span>
          </div>

          <CircularProgress progress={progress} zone={zone} isPulsing={isPulsing}>
            <div className="flex flex-col items-center">
              <span className={cn("text-4xl font-semibold tabular-nums transition-colors", ZONE_TEXT[zone])}>
                {formatCountdown(remainingSeconds)}
              </span>
              <span className="text-xs text-muted-foreground">time remaining</span>
            </div>
          </CircularProgress>

          <p className="max-w-xs text-sm text-muted-foreground">
            Complete your payment before the timer runs out to confirm your seat.
          </p>

          <div className="flex w-full flex-col gap-3">
            <Button size="lg" className="h-12 w-full text-base" onClick={onPay} disabled={isPaying}>
              {isPaying ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing payment&hellip;
                </>
              ) : (
                "Complete Payment"
              )}
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={onCancel} disabled={isPaying}>
              <X className="size-4" />
              Cancel Reservation
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

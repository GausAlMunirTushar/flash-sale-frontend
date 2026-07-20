"use client";

import { motion } from "framer-motion";
import { TimerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReservationExpiredProps {
  onReserveAgain: () => void;
}

export function ReservationExpired({ onReserveAgain }: ReservationExpiredProps) {
  return (
    <motion.div
      key="reservation-expired"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-muted">
            <TimerOff className="size-6 text-muted-foreground" />
          </span>
          <p className="text-xl font-semibold">Reservation Expired</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Your hold timed out and the seat has been returned to inventory. You&apos;re welcome to
            reserve again while seats remain.
          </p>
          <Button size="lg" className="h-12 w-full text-base" onClick={onReserveAgain}>
            Reserve Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

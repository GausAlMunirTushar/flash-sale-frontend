"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const BENEFITS = [
  "Guaranteed 5 minute hold",
  "Secure, encrypted reservation",
  "Instant confirmation on payment",
];

interface ReservationCardProps {
  seatsAvailable: number;
  isReserving: boolean;
  onReserve: () => void;
}

export function ReservationCard({ seatsAvailable, isReserving, onReserve }: ReservationCardProps) {
  return (
    <motion.div
      key="reservation-card"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border shadow-lg">
        <CardHeader className="border-b border-border/60 bg-muted/30 pb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <ShieldCheck className="size-4" />
            Exclusive Reservation
          </div>
          <p className="text-2xl font-semibold">Reserve Your Seat</p>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <ul className="space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="size-4 shrink-0 text-success" />
                {benefit}
              </li>
            ))}
          </ul>

          <p className="text-sm font-medium text-urgency-red">
            Only {seatsAvailable} seats left &mdash; act fast
          </p>

          <Button
            size="lg"
            className="h-12 w-full text-base"
            onClick={onReserve}
            disabled={isReserving || seatsAvailable <= 0}
          >
            {isReserving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Reserving your seat&hellip;
              </>
            ) : (
              "Reserve Seat"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            No payment required until your seat is confirmed.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

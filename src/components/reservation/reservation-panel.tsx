"use client";

import { motion } from "framer-motion";
import {
  Armchair,
  Ban,
  CheckCircle2,
  Clock,
  CreditCard,
  Hash,
  Info,
  Loader2,
  Lock,
  MousePointerClick,
  ShieldCheck,
  TimerOff,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "@/components/shared/circular-progress";
import type { CountdownZone } from "@/hooks/use-countdown";
import { formatCountdown } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ReservationPhase, Reservation } from "@/types/reservation";
import type { PaymentResult } from "@/types/payment";

const ZONE_TEXT: Record<CountdownZone, string> = {
  blue: "text-urgency-blue",
  amber: "text-urgency-amber",
  red: "text-urgency-red",
};

interface ReservationPanelProps {
  phase: ReservationPhase;
  reservation: Reservation | null;
  payment: PaymentResult | null;
  remainingSeconds: number;
  zone: CountdownZone;
  progress: number;
  isPulsing: boolean;
  onPay: () => void;
  onCancel: () => void;
  onReserveAgain: () => void;
}

export function ReservationPanel({
  phase,
  reservation,
  payment,
  remainingSeconds,
  zone,
  progress,
  isPulsing,
  onPay,
  onCancel,
  onReserveAgain,
}: ReservationPanelProps) {
  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader className="flex-row items-center justify-between border-b border-border/60 pb-4">
        <p className="text-lg font-semibold">Your Reservation</p>
        {(phase === "holding" || phase === "paying") && (
          <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/10">
            <Lock className="size-3" />
            Locked
          </Badge>
        )}
      </CardHeader>

      <CardContent className="pt-6">
        {phase === "idle" && <IdleState />}
        {phase === "reserving" && <ReservingState />}
        {(phase === "holding" || phase === "paying") && reservation && (
          <HoldingState
            reservation={reservation}
            remainingSeconds={remainingSeconds}
            zone={zone}
            progress={progress}
            isPulsing={isPulsing}
            isPaying={phase === "paying"}
            onPay={onPay}
            onCancel={onCancel}
          />
        )}
        {phase === "expired" && <ExpiredState onReserveAgain={onReserveAgain} />}
        {phase === "soldOut" && <SoldOutState />}
        {phase === "success" && payment && <SuccessState payment={payment} onReserveAgain={onReserveAgain} />}
      </CardContent>
    </Card>
  );
}

function IdleState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MousePointerClick className="size-5 text-muted-foreground" />
      </span>
      <p className="font-medium">No Active Reservation</p>
      <p className="max-w-56 text-sm text-muted-foreground">
        Select any available seat from the map to start a 5-minute hold.
      </p>
    </div>
  );
}

function ReservingState() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Locking your seat&hellip;</p>
    </div>
  );
}

function HoldingState({
  reservation,
  remainingSeconds,
  zone,
  progress,
  isPulsing,
  isPaying,
  onPay,
  onCancel,
}: {
  reservation: Reservation;
  remainingSeconds: number;
  zone: CountdownZone;
  progress: number;
  isPulsing: boolean;
  isPaying: boolean;
  onPay: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Time Left</p>
          <p className={cn("text-4xl font-semibold tabular-nums transition-colors", ZONE_TEXT[zone])}>
            {formatCountdown(remainingSeconds)}
          </p>
        </div>
        <CircularProgress progress={progress} zone={zone} isPulsing={isPulsing} size={72} strokeWidth={6}>
          <Lock className={cn("size-5 transition-colors", ZONE_TEXT[zone])} />
        </CircularProgress>
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        Complete the mock payment before time runs out. Your seat will be released automatically.
      </div>

      <Separator />

      <dl className="space-y-2.5 text-sm">
        <Row icon={Armchair} label="Seat" value={reservation.seatNumber} />
        <Row icon={Clock} label="Reserved At" value={formatTimestamp(reservation.createdAt)} />
        <Row icon={Clock} label="Expires At" value={formatTimestamp(reservation.expiresAt)} />
        <Row icon={Hash} label="Reservation ID" value={reservation.id} />
      </dl>

      <div className="space-y-2 pt-1">
        <Button size="lg" className="h-12 w-full text-base" onClick={onPay} disabled={isPaying}>
          {isPaying ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing&hellip;
            </>
          ) : (
            <>
              <CreditCard className="size-4" />
              Mock Pay Now
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full border-urgency-red/30 text-base text-urgency-red hover:bg-urgency-red/10 hover:text-urgency-red"
          onClick={onCancel}
          disabled={isPaying}
        >
          <Trash2 className="size-4" />
          Cancel Reservation
        </Button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-xs text-success">
        <ShieldCheck className="size-3.5" />
        Your payment is 100% secure and encrypted.
      </p>
    </div>
  );
}

function ExpiredState({ onReserveAgain }: { onReserveAgain: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <TimerOff className="size-5 text-muted-foreground" />
      </span>
      <p className="font-medium">Reservation Expired</p>
      <p className="max-w-56 text-sm text-muted-foreground">
        Your hold timed out and the seat was returned to inventory.
      </p>
      <Button className="mt-2 w-full" onClick={onReserveAgain}>
        Pick a New Seat
      </Button>
    </div>
  );
}

function SoldOutState() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Ban className="size-5 text-muted-foreground" />
      </span>
      <p className="font-medium">Sold Out</p>
      <p className="max-w-56 text-sm text-muted-foreground">
        All seats have been reserved. Check back for the next drop.
      </p>
    </div>
  );
}

function SuccessState({ payment, onReserveAgain }: { payment: PaymentResult; onReserveAgain: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex size-12 items-center justify-center rounded-full bg-success/10"
      >
        <CheckCircle2 className="size-6 text-success" />
      </motion.span>
      <p className="font-medium">You&apos;re Confirmed!</p>
      <p className="max-w-56 text-sm text-muted-foreground">Seat {payment.seatNumber} is officially yours.</p>

      <dl className="mt-2 w-full space-y-2 text-left text-sm">
        <Row icon={Hash} label="Reservation" value={payment.reservationId} />
        <Row icon={CreditCard} label="Amount Paid" value={`$${payment.amount.toFixed(2)}`} />
      </dl>

      <Button className="mt-2 w-full" onClick={onReserveAgain}>
        Reserve Another Seat
      </Button>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function formatTimestamp(ms: number) {
  return new Date(ms).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

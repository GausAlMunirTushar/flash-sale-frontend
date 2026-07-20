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
  Smartphone,
  TimerOff,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "@/components/shared/circular-progress";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
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
  cancelDialogOpen: boolean;
  setCancelDialogOpen: (open: boolean) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
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
  cancelDialogOpen,
  setCancelDialogOpen,
  phone,
  onPhoneChange,
}: ReservationPanelProps) {
  return (
    <>
      <Card className="h-full rounded-xl border-border">
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
              onCancel={() => setCancelDialogOpen(true)}
              phone={phone}
              onPhoneChange={onPhoneChange}
            />
          )}
          {phase === "expired" && <ExpiredState onReserveAgain={onReserveAgain} />}
          {phase === "soldOut" && <SoldOutState />}
          {phase === "success" && payment && <SuccessState payment={payment} onReserveAgain={onReserveAgain} />}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel Reservation?"
        description="Your seat will be released back to inventory. This action cannot be undone."
        confirmLabel="Yes, Cancel"
        cancelLabel="Keep It"
        variant="destructive"
        onConfirm={onCancel}
      />
    </>
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

function isValidPhone(v: string): boolean {
  return /^01\d{9}$/.test(v.replace(/\D/g, ''));
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
  phone,
  onPhoneChange,
}: {
  reservation: Reservation;
  remainingSeconds: number;
  zone: CountdownZone;
  progress: number;
  isPulsing: boolean;
  isPaying: boolean;
  onPay: () => void;
  onCancel: () => void;
  phone: string;
  onPhoneChange: (v: string) => void;
}) {
  const digits = phone.replace(/\D/g, '');
  const phoneValid = phone.length > 0 && isValidPhone(phone);
  const phoneError = phone.length > 0 && !phoneValid;

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

      <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        Complete the payment before time runs out. Your seat will be released automatically.
      </div>

      <Separator />

      <dl className="space-y-2.5 text-sm">
        <Row icon={Armchair} label="Seat" value={reservation.seatNumber} />
        <Row icon={Clock} label="Reserved At" value={formatTimestamp(reservation.createdAt)} />
        <Row icon={Clock} label="Expires At" value={formatTimestamp(reservation.expiresAt)} />
        <Row icon={Hash} label="Reservation" value={reservation.reservationCode} />
      </dl>

      <div className="space-y-3 pt-1">
        <div>
          <label htmlFor="pay-phone" className="mb-1 block text-xs font-medium text-muted-foreground">
            <Smartphone className="mr-1 inline size-3" />
            Phone (for SMS receipt)
          </label>
          <input
            id="pay-phone"
            type="tel"
            placeholder="01726XXXXXX"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={`flex h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring ${
              phoneError ? 'border-destructive' : 'border-input'
            }`}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-destructive">
              Enter a valid 11-digit BD number (01XXXXXXXXX)
            </p>
          )}
          {phone.length > 0 && phoneValid && (
            <p className="mt-1 text-xs text-success">Valid number</p>
          )}
        </div>
        <Button size="lg" className="h-12 w-full text-base" onClick={onPay} disabled={isPaying || !phoneValid}>
          {isPaying ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing&hellip;
            </>
          ) : (
            <>
              <CreditCard className="size-4" />
              Pay Now
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
  return new Date(ms).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

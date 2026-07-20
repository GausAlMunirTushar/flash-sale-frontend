"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PaymentResult } from "@/types/payment";

interface PaymentSuccessProps {
  payment: PaymentResult;
  onReturn: () => void;
}

export function PaymentSuccess({ payment, onReturn }: PaymentSuccessProps) {
  return (
    <motion.div
      key="payment-success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex size-16 items-center justify-center rounded-full bg-success/10"
          >
            <CheckCircle2 className="size-8 text-success" />
          </motion.span>

          <p className="text-xl font-semibold">You&apos;re Confirmed!</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Your seat is officially yours. A confirmation has been sent to your account.
          </p>

          <Separator className="my-2" />

          <div className="w-full space-y-2 text-left text-sm">
            <Row label="Reservation" value={payment.reservationId} />
            <Row label="Seat" value={payment.seatNumber} />
            <Row label="Amount Paid" value={`$${payment.amount.toFixed(2)}`} />
          </div>

          <Button size="lg" className="mt-2 h-12 w-full text-base" onClick={onReturn}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

"use client";

import { AnimatePresence } from "framer-motion";
import { CountdownPanel } from "@/components/reservation/countdown-panel";
import { ReservationCard } from "@/components/reservation/reservation-card";
import { ReservationExpired } from "@/components/reservation/reservation-expired";
import { SoldOut } from "@/components/reservation/sold-out";
import { PaymentSuccess } from "@/components/payment/payment-success";
import { useReservationFlow } from "@/features/reservation/use-reservation-flow";

export function ReservationFlow() {
  const {
    phase,
    reservation,
    payment,
    seatsAvailable,
    countdown,
    handleReserve,
    handlePay,
    handleCancel,
    handleReserveAgain,
    handleReturn,
  } = useReservationFlow();

  return (
    <section id="reserve" className="mx-auto max-w-md px-6 py-12">
      <AnimatePresence mode="wait">
        {(phase === "idle" || phase === "reserving") && (
          <ReservationCard
            key="card"
            seatsAvailable={seatsAvailable}
            isReserving={phase === "reserving"}
            onReserve={handleReserve}
          />
        )}

        {(phase === "holding" || phase === "paying") && reservation && (
          <CountdownPanel
            key="countdown"
            reservation={reservation}
            remainingSeconds={countdown.remainingSeconds}
            zone={countdown.zone}
            progress={countdown.progress}
            isPulsing={countdown.isPulsing}
            isPaying={phase === "paying"}
            onPay={handlePay}
            onCancel={handleCancel}
          />
        )}

        {phase === "expired" && <ReservationExpired key="expired" onReserveAgain={handleReserveAgain} />}

        {phase === "soldOut" && <SoldOut key="sold-out" />}

        {phase === "success" && payment && (
          <PaymentSuccess key="success" payment={payment} onReturn={handleReturn} />
        )}
      </AnimatePresence>
    </section>
  );
}

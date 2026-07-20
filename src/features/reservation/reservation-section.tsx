"use client";

import { SeatGrid } from "@/components/seat/seat-grid";
import { ReservationPanel } from "@/components/reservation/reservation-panel";
import { useReservationFlow } from "@/features/reservation/use-reservation-flow";

export function ReservationSection() {
  const {
    phase,
    reservation,
    payment,
    countdown,
    handleReserve,
    handlePay,
    handleCancel,
    handleReserveAgain,
    cancelDialogOpen,
    setCancelDialogOpen,
  } = useReservationFlow();

  return (
    <section id="reserve" className="mx-auto grid max-w-6xl gap-6 px-6 py-6 lg:grid-cols-[1fr_380px]">
      <SeatGrid onSelectSeat={handleReserve} selectionDisabled={phase !== "idle"} />

      <div className="space-y-6">
        <ReservationPanel
          phase={phase}
          reservation={reservation}
          payment={payment}
          remainingSeconds={countdown.remainingSeconds}
          zone={countdown.zone}
          progress={countdown.progress}
          isPulsing={countdown.isPulsing}
          onPay={handlePay}
          onCancel={handleCancel}
          onReserveAgain={handleReserveAgain}
          cancelDialogOpen={cancelDialogOpen}
          setCancelDialogOpen={setCancelDialogOpen}
        />
      </div>
    </section>
  );
}

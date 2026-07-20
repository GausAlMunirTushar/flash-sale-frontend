"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCountdown } from "@/hooks/use-countdown";
import { useSeatStats } from "@/hooks/use-seat-stats";
import { cancelReservation, createReservation } from "@/services/reservation.service";
import { payMock } from "@/services/payment.service";
import { useReservationStore } from "@/store/reservation-store";

export function useReservationFlow() {
  const queryClient = useQueryClient();
  const { data: seatStats } = useSeatStats();
  const { phase, reservation, payment, setPhase, setReservation, setPayment, reset } =
    useReservationStore();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const invalidateSeats = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["seat-stats"] });
    queryClient.invalidateQueries({ queryKey: ["seat-map"] });
  }, [queryClient]);

  const handleExpire = useCallback(() => {
    setPhase("expired");
    toast.error("Reservation expired", {
      description: "Your seat was released back to inventory.",
    });
    invalidateSeats();
  }, [setPhase, invalidateSeats]);

  const countdown = useCountdown({
    expiresAt: phase === "holding" ? (reservation?.expiresAt ?? null) : null,
    onExpire: handleExpire,
  });

  const handleReserve = useCallback(
    async (seatId: string) => {
      if (!seatStats || seatStats.available <= 0) {
        setPhase("soldOut");
        return;
      }

      setPhase("reserving");
      try {
        const created = await createReservation(seatId);
        setReservation(created);
        setPhase("holding");
        toast.success("Seat reserved", {
          description: `Seat ${created.seatNumber} is on hold for 5 minutes.`,
        });
        invalidateSeats();
      } catch {
        setPhase("idle");
        toast.error("That seat just got taken", { description: "Please pick another seat." });
        invalidateSeats();
      }
    },
    [seatStats, setPhase, setReservation, invalidateSeats]
  );

  const handlePay = useCallback(async () => {
    if (!reservation) return;

    setPhase("paying");
    try {
      const result = await payMock(reservation);
      setPayment(result);
      setPhase("success");
      toast.success("Payment successful", { description: "Your seat is confirmed." });
      invalidateSeats();
    } catch {
      setPhase("holding");
      toast.error("Payment failed", { description: "Please try again before your hold expires." });
    }
  }, [reservation, setPhase, setPayment, invalidateSeats]);

  const handleCancel = useCallback(async () => {
    if (!reservation) return;
    try {
      await cancelReservation(reservation.id);
      reset();
      toast("Reservation cancelled", { description: "Your seat was returned to inventory." });
      invalidateSeats();
    } catch {
      toast.error("Failed to cancel", { description: "Please try again." });
    }
  }, [reservation, reset, invalidateSeats]);

  const handleReserveAgain = useCallback(() => {
    reset();
  }, [reset]);

  return {
    phase,
    reservation,
    payment,
    seatsAvailable: seatStats?.available ?? 0,
    countdown,
    handleReserve,
    handlePay,
    handleCancel,
    handleReserveAgain,
    cancelDialogOpen,
    setCancelDialogOpen,
  };
}

import { create } from "zustand";
import type { Reservation, ReservationPhase } from "@/types/reservation";
import type { PaymentResult } from "@/types/payment";

interface ReservationState {
  phase: ReservationPhase;
  reservation: Reservation | null;
  payment: PaymentResult | null;
  setPhase: (phase: ReservationPhase) => void;
  setReservation: (reservation: Reservation | null) => void;
  setPayment: (payment: PaymentResult | null) => void;
  reset: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  phase: "idle",
  reservation: null,
  payment: null,
  setPhase: (phase) => set({ phase }),
  setReservation: (reservation) => set({ reservation }),
  setPayment: (payment) => set({ payment }),
  reset: () => set({ phase: "idle", reservation: null, payment: null }),
}));

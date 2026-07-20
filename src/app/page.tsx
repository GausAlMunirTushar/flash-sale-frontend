import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/shared/hero";
import { SeatStatsSection } from "@/components/seat/seat-stats-section";
import { ReservationFlow } from "@/features/reservation/reservation-flow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SeatStatsSection />
        <ReservationFlow />
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/shared/hero";
import { StatsRow } from "@/components/seat/stats-row";
import { LiveActivityFeed } from "@/components/shared/live-activity-feed";
import { ReservationSection } from "@/features/reservation/reservation-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-16">
        <Hero />
        <StatsRow />
        <ReservationSection />
        <section className="mx-auto max-w-6xl px-6 py-6">
          <LiveActivityFeed />
        </section>
      </main>
      <Footer />
    </>
  );
}

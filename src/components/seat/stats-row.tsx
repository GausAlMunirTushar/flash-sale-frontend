"use client";

import { CalendarClock, Clock, ClipboardCheck, Users, Armchair } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useSeatStats } from "@/hooks/use-seat-stats";
import { formatCountdown } from "@/lib/format";

export function StatsRow() {
  const { data, isLoading } = useSeatStats();

  if (isLoading || !data) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const stats = [
    { icon: Armchair, bg: "bg-success/10", fg: "text-success", value: data.available, label: "Available Seats Left" },
    { icon: CalendarClock, bg: "bg-urgency-amber/10", fg: "text-urgency-amber", value: data.locked, label: "Reserved Now" },
    { icon: ClipboardCheck, bg: "bg-urgency-blue/10", fg: "text-urgency-blue", value: data.sold, label: "Sold Today" },
    { icon: Users, bg: "bg-primary/10", fg: "text-primary", value: data.viewing, label: "People Watching" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ icon: Icon, bg, fg, value, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${bg}`}>
              <Icon className={`size-5 ${fg}`} />
            </span>
            <div>
              <AnimatedCounter value={value} className="block text-xl font-semibold tabular-nums" />
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-urgency-amber/10">
            <Clock className="size-5 text-urgency-amber" />
          </span>
          <div>
            <span className="block text-xl font-semibold tabular-nums">
              {formatCountdown(data.avgReservationSeconds)}
            </span>
            <p className="text-xs text-muted-foreground">Avg Reservation Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}

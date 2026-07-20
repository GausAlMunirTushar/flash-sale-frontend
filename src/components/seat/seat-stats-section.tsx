"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useSeatStats } from "@/hooks/use-seat-stats";
import { cn } from "@/lib/utils";

export function SeatStatsSection() {
  const { data, isLoading } = useSeatStats();

  if (isLoading || !data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-6 h-2 w-full" />
        </div>
      </section>
    );
  }

  const percentSold = Math.round((data.sold / data.total) * 100);
  const isLow = data.available <= 10;

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Live Seat Availability</p>
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5",
              isLow ? "border-urgency-red/30 text-urgency-red" : "border-success/30 text-success"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isLow ? "bg-urgency-red" : "bg-success",
                "animate-pulse"
              )}
            />
            {isLow ? "Almost Sold Out" : "Selling Fast"}
          </Badge>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <AnimatedCounter value={data.available} className="text-5xl font-semibold tabular-nums" />
          <span className="text-lg text-muted-foreground">/ {data.total} seats left</span>
        </div>

        <Progress value={percentSold} className="mt-6 h-2" />

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <Stat label="Reserved" value={data.locked} />
          <Stat label="Sold" value={data.sold} />
          <Stat label="Viewing Now" value={data.viewing} />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <AnimatedCounter value={value} className="text-xl font-semibold tabular-nums" />
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

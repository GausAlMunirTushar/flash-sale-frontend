"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Timer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSeatStats } from "@/hooks/use-seat-stats";

const TRUST_INDICATORS = [
  { icon: Timer, label: "5-Minute Hold" },
  { icon: ShieldCheck, label: "Secure Reservation" },
  { icon: Zap, label: "Instant Confirmation" },
];

export function Hero() {
  const { data } = useSeatStats();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_oklch,var(--primary),transparent_75%),transparent_60%),radial-gradient(circle_at_85%_10%,color-mix(in_oklch,var(--urgency-amber),transparent_82%),transparent_55%)]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="gap-1.5 bg-urgency-red/10 text-urgency-red hover:bg-urgency-red/10">
            <Sparkles className="size-3.5" />
            Flash Sale is Live
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Only {data?.total ?? "—"} Exclusive Seats Available
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 max-w-xl text-balance text-lg text-muted-foreground"
        >
          Reserve your seat now before they&apos;re gone. You&apos;ll get a guaranteed
          5-minute hold to complete your payment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <a href="#reserve">Reserve Seat</a>
          </Button>
          {data && (
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{data.available}</span> seats left
              &middot; <span className="font-medium text-foreground">{data.viewing}</span> people
              viewing now
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

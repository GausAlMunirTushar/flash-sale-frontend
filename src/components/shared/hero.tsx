"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Sparkles, Ticket, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSeatStats } from "@/hooks/use-seat-stats";

const TRUST_PILLS = [
  { icon: ShieldCheck, label: "Secure", color: "text-success" },
  { icon: Zap, label: "Instant Lock (5 min)", color: "text-urgency-red" },
  { icon: Lock, label: "Safe & Encrypted", color: "text-urgency-blue" },
];

const CONFETTI = [
  { top: "10%", left: "8%", color: "bg-urgency-amber", delay: 0 },
  { top: "22%", left: "78%", color: "bg-success", delay: 0.4 },
  { top: "62%", left: "12%", color: "bg-urgency-blue", delay: 0.8 },
  { top: "72%", left: "82%", color: "bg-urgency-red", delay: 0.2 },
  { top: "40%", left: "92%", color: "bg-urgency-amber", delay: 0.6 },
];

export function Hero() {
  const { data } = useSeatStats();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-10">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-urgency-red/5 via-transparent to-primary/5 px-8 py-14 sm:grid-cols-2 sm:px-12">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="gap-1.5 bg-urgency-red/10 text-urgency-red hover:bg-urgency-red/10">
              <span className="size-1.5 animate-pulse rounded-full bg-urgency-red" />
              Flash Sale is Live
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Only {data?.total ?? 50} Exclusive Seats!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-balance text-lg text-muted-foreground"
          >
            High demand. Limited seats. Reserve now before it&apos;s too late.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7"
          >
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <a href="#reserve">Reserve Seat</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {TRUST_PILLS.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className={`size-4 ${color}`} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-56 items-center justify-center sm:flex">
          {CONFETTI.map((c, i) => (
            <motion.span
              key={i}
              className={`absolute size-2.5 rounded-full ${c.color}`}
              style={{ top: c.top, left: c.left }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex size-40 items-center justify-center rounded-3xl bg-urgency-red text-primary-foreground shadow-xl"
          >
            <Ticket className="size-16" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
            className="absolute -right-1 top-2 flex size-9 items-center justify-center rounded-full bg-urgency-amber text-white shadow-lg"
          >
            <Sparkles className="size-4" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}

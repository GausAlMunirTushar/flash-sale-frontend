"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Armchair, CalendarClock, CheckCircle2, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLiveActivity } from "@/hooks/use-live-activity";
import { formatRelativeTime } from "@/lib/format";
import type { ActivityType } from "@/types/activity";

const TYPE_STYLES: Record<ActivityType, { icon: React.ComponentType<{ className?: string }>; bg: string; fg: string }> = {
  purchased: { icon: ShoppingBag, bg: "bg-success/10", fg: "text-success" },
  reserved: { icon: CalendarClock, bg: "bg-urgency-amber/10", fg: "text-urgency-amber" },
  payment: { icon: CheckCircle2, bg: "bg-urgency-blue/10", fg: "text-urgency-blue" },
  released: { icon: Armchair, bg: "bg-muted", fg: "text-muted-foreground" },
};

export function LiveActivityFeed() {
  const events = useLiveActivity();

  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader className="flex-row items-center justify-between border-b border-border/60 pb-4">
        <p className="text-lg font-semibold">Live Activity</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-urgency-red">
          <span className="size-1.5 animate-pulse rounded-full bg-urgency-red" />
          Live
        </span>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <AnimatePresence initial={false}>
            {events.map((event) => {
              const { icon: Icon, bg, fg } = TYPE_STYLES[event.type];
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2.5 rounded-2xl border border-border/60 bg-muted/30 p-3"
                >
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
                    <Icon className={`size-4 ${fg}`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs leading-snug text-foreground">{event.message}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {formatRelativeTime(event.createdAt)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

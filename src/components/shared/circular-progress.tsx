"use client";

import { cn } from "@/lib/utils";
import type { CountdownZone } from "@/hooks/use-countdown";

interface CircularProgressProps {
  progress: number;
  zone: CountdownZone;
  isPulsing?: boolean;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const ZONE_STROKE: Record<CountdownZone, string> = {
  blue: "stroke-urgency-blue",
  amber: "stroke-urgency-amber",
  red: "stroke-urgency-red",
};

export function CircularProgress({
  progress,
  zone,
  isPulsing,
  size = 220,
  strokeWidth = 10,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", isPulsing && "animate-pulse")}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("fill-none transition-[stroke-dashoffset,stroke] duration-1000 ease-linear", ZONE_STROKE[zone])}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

import { useEffect, useReducer, useRef } from "react";
import {
  COUNTDOWN_AMBER_THRESHOLD,
  COUNTDOWN_PULSE_THRESHOLD,
  COUNTDOWN_RED_THRESHOLD,
  HOLD_DURATION_SECONDS,
} from "@/constants/reservation";

export type CountdownZone = "blue" | "amber" | "red";

interface UseCountdownOptions {
  expiresAt: number | null;
  onExpire?: () => void;
}

function secondsRemaining(expiresAt: number) {
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
}

export function useCountdown({ expiresAt, onExpire }: UseCountdownOptions) {
  const [, forceTick] = useReducer((tick: number) => tick + 1, 0);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    hasExpiredRef.current = false;
    if (!expiresAt) return;

    const interval = setInterval(forceTick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const remainingSeconds = expiresAt ? secondsRemaining(expiresAt) : 0;
  const isExpired = expiresAt != null && remainingSeconds <= 0;

  useEffect(() => {
    if (isExpired && !hasExpiredRef.current) {
      hasExpiredRef.current = true;
      onExpire?.();
    }
  }, [isExpired, onExpire]);

  const zone: CountdownZone =
    remainingSeconds <= COUNTDOWN_RED_THRESHOLD
      ? "red"
      : remainingSeconds <= COUNTDOWN_AMBER_THRESHOLD
        ? "amber"
        : "blue";

  return {
    remainingSeconds,
    zone,
    progress: Math.min(1, remainingSeconds / HOLD_DURATION_SECONDS),
    isPulsing: remainingSeconds <= COUNTDOWN_PULSE_THRESHOLD && remainingSeconds > 0,
    isExpired,
  };
}

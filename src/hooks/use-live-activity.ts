import { useEffect, useState } from "react";
import { generateActivityEvent, generateInitialActivity } from "@/services/activity.service";
import type { ActivityEvent } from "@/types/activity";

const MAX_EVENTS = 5;
const NEW_EVENT_INTERVAL_MS = 7000;

export function useLiveActivity() {
  const [events, setEvents] = useState<ActivityEvent[]>(() => generateInitialActivity(MAX_EVENTS));
  const [, forceTick] = useState(0);

  useEffect(() => {
    const eventTimer = setInterval(() => {
      setEvents((prev) => [generateActivityEvent(), ...prev].slice(0, MAX_EVENTS));
    }, NEW_EVENT_INTERVAL_MS);

    const clockTimer = setInterval(() => forceTick((n) => n + 1), 1000);

    return () => {
      clearInterval(eventTimer);
      clearInterval(clockTimer);
    };
  }, []);

  return events;
}

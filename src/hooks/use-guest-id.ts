import { useEffect, useState } from "react";

const STORAGE_KEY = "flashseat-guest-id";

function generateGuestId() {
  return `GUEST-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function useGuestId() {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) {
        setGuestId(existing);
        return;
      }

      const created = generateGuestId();
      window.localStorage.setItem(STORAGE_KEY, created);
      setGuestId(created);
    });
  }, []);

  return guestId;
}

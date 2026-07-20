import { useEffect, useState } from "react";

const STORAGE_KEY = "flashseat-guest-id";

function generateGuestId() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return `GUEST-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase().slice(0, 6)}`;
}

export function useGuestId() {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) {
      setGuestId(existing);
      return;
    }

    const created = generateGuestId();
    window.localStorage.setItem(STORAGE_KEY, created);
    setGuestId(created);
  }, []);

  return guestId;
}

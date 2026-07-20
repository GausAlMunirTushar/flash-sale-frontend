import { useEffect, useState } from "react";

export function useRefreshCountdown(intervalSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? intervalSeconds : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [intervalSeconds]);

  return secondsLeft;
}

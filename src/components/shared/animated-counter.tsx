"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(value);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !ready) {
      node!.textContent = value.toString();
      return;
    }

    const controls = animate(previousValue.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      },
    });

    previousValue.current = value;
    return () => controls.stop();
  }, [value, ready]);

  return (
    <span ref={ref} className={className}>
      {ready ? value : value}
    </span>
  );
}

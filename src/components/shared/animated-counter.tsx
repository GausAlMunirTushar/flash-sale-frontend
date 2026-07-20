"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(previousValue.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      },
    });

    previousValue.current = value;

    return () => controls.stop();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

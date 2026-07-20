"use client";

import { useEffect } from 'react';
import { initGuestSession } from '@/services/auth.service';

export function AuthInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initGuestSession();
  }, []);

  return <>{children}</>;
}

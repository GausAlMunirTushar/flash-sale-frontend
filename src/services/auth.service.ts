import api from '@/lib/api';

let initialized = false;

export async function initGuestSession(): Promise<void> {
  if (initialized) return;
  initialized = true;

  try {
    await api.post('/api/auth/sign-in/anonymous');
  } catch {
    // Guest session failed — backend may not be running
  }
}

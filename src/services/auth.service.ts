import api, { setAuthToken } from '@/lib/api';

let initialized = false;

export async function initGuestSession(): Promise<void> {
  if (initialized) return;
  initialized = true;

  try {
    const { data } = await api.post('/api/auth/anonymous');

    const token = data?.token || '';
    if (token) {
      setAuthToken(token);
    }
  } catch {
    // Guest session failed — backend may not be running
  }
}

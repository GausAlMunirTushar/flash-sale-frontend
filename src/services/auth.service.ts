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

export async function loginUser(email: string, password: string) {
  const { data } = await api.post('/api/auth/sign-in/email', {
    email,
    password,
  });
  return data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await api.post('/api/auth/sign-up/email', {
    name,
    email,
    password,
  });
  return data;
}

export async function logoutUser() {
  await api.post('/api/auth/sign-out');
}

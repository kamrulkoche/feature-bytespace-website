export type AuthUser = {
  email: string;
  name: string;
};

export const AUTH_STORAGE_KEY = 'bytespace_auth_user';

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const setAuthUser = (user: AuthUser) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('bytespace-auth-change'));
};

export const clearAuthUser = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event('bytespace-auth-change'));
};

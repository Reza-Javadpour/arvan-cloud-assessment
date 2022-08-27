import { clearAuthData, getAuthInfo } from './storage.js';

export function isLoggedIn() {
  return !!getAuthInfo();
}

export function doLogout() {
  clearAuthData();
  window.location.reload();
}

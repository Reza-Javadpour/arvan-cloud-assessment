const AUTH_KEY = 'auth';

export function setAuthInfo(authInfo) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(authInfo));
}

export function getAuthInfo() {
  const authData = window.localStorage.getItem(AUTH_KEY);
  if (!authData) {
    return false;
  }
  return JSON.parse(authData);
}

export function isLoggedIn() {
  return !!window.localStorage.getItem(AUTH_KEY);
}

export function getUsername() {
  let authData = window.localStorage.getItem(AUTH_KEY);
  if (authData) {
    authData = JSON.parse(authData);
    return authData.username || '';
  }
}

export function getToken() {
  let authData = window.localStorage.getItem(AUTH_KEY);
  if (authData) {
    authData = JSON.parse(authData);
    return authData.token || '';
  }
}

export function clearAuthData() {
  window.localStorage.removeItem(AUTH_KEY);
}

// authUtils.js

// Key untuk menyimpan token pengguna di localStorage
const AUTH_TOKEN_KEY = 'auth_token';

// Simpan token pengguna di localStorage
export const saveAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Ambil token pengguna dari localStorage
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Hapus token pengguna dari localStorage
export const clearAuthData = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

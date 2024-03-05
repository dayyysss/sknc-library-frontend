// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// Buat context untuk manajemen autentikasi
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State untuk menyimpan status autentikasi pengguna
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Gunakan useEffect untuk mengecek status autentikasi saat komponen dimuat
  useEffect(() => {
    // Lakukan pengecekan autentikasi di sini (misalnya, dengan mengecek token)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

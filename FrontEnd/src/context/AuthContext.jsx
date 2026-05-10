import { createContext, useContext, useState, useEffect } from 'react';
import { setAccessToken, clearAccessToken, getAccessToken } from '../api/client';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const restoreSession = async () => {
    setIsRestoring(true);
    try {
      const token = getAccessToken();
      if (token) {
        await authApi.verify();
        setIsAuthenticated(true);
        return;
      }
      // no access token — try refresh via HttpOnly cookie
      const { data } = await authApi.refresh();
      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
    } catch {
      clearAccessToken();
      setIsAuthenticated(false);
    } finally {
      setIsRestoring(false);
    }
  };

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    setAccessToken(data.accessToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // logout even if server call fails
    } finally {
      clearAccessToken();
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isRestoring, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
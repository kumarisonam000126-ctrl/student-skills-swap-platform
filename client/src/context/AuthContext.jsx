import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('skillswap_token') || null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('skillswap_token');
      const savedUser = localStorage.getItem('skillswap_user');

      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
          // Verify with backend
          const res = await authAPI.getMe();
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('skillswap_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.success) {
        const { token: newToken, user: userData } = res.data;
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('skillswap_token', newToken);
        localStorage.setItem('skillswap_user', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.full_name || 'Student'}!`);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (formData) => {
    try {
      const res = await authAPI.register(formData);
      if (res.data.success) {
        if (res.data.token && res.data.user) {
          const { token: newToken, user: userData } = res.data;
          setToken(newToken);
          setUser(userData);
          localStorage.setItem('skillswap_token', newToken);
          localStorage.setItem('skillswap_user', JSON.stringify(userData));
        }
        toast.success(res.data.message || 'Account created successfully!');
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please check your details.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillswap_token');
    localStorage.removeItem('skillswap_user');
    toast.info('You have logged out.');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

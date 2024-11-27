'use client';

import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useState } from 'react';

type AuthContextType = {
  user: { id: string; name: string } | null;
  signIn: (userData: { id: string; name: string }) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  function signIn(userData: { id: string; name: string }) {
    setUser(userData);

    Cookies.set('token', 'my-secret-token', {
      path: '/',
      secure: true,
      sameSite: 'strict',
      expires: 1,
    });
  }

  function signOut() {
    setUser(null);

    Cookies.remove('token');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};

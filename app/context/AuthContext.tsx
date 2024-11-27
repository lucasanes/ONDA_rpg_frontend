'use client';

import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useState } from 'react';

type UserType = {
  email: string;
  password: string;
};

type SignInType = UserType & {
  rememberMe: boolean;
};

type AuthContextType = {
  user: UserType | null;
  signIn: (userData: SignInType) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  function signIn(userData: SignInType) {
    //Todo: Implementar API
    // const response = await api.post('/auth/signin', {
    //   email: userData.email,
    //   password: userData.password,
    // });

    setUser({
      email: userData.email,
      password: userData.password,
    });

    Cookies.set('token', 'my-secret-token', {
      path: '/',
      secure: true,
      sameSite: 'strict',
      expires: userData.rememberMe ? 14 : undefined,
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

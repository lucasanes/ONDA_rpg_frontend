'use client';

import { api } from '@/providers/api';
import Cookies from 'js-cookie';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

type UserType = {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
};

type SignInType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type SignUpType = {
  email: string;
  password: string;
  username: string;
};

type AuthContextType = {
  user: UserType | null;
  signIn: (userData: SignInType) => Promise<void>;
  signUp: (userData: SignUpType) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetchToken();
  }, []);

  async function fetchToken() {
    const token = Cookies.get('token');

    if (token) {
      try {
        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        });
      } catch (error) {
        Cookies.remove('token');
        window.location.href = '/';
      }
    }
  }

  async function signIn(userData: SignInType) {
    try {
      const response = await api.post('/auth/sign-in', {
        email: userData.email,
        password: userData.password,
      });

      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
      });

      Cookies.set('token', response.data.token, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: userData.rememberMe ? 14 : undefined,
      });
    } catch (error: any) {
      console.error(error);
      toast.error('Email ou senha inválidos');
    }
  }

  async function signUp(userData: SignUpType) {
    try {
      await api.post('/auth/sign-up', {
        email: userData.email,
        password: userData.password,
        username: userData.username,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  function signOut() {
    setUser(null);

    Cookies.remove('token');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
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

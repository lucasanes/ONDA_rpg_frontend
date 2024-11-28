'use client';

import Cookies from 'js-cookie';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserType = {
  email: string;
  username: string;
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
        //ToDo: Implementar chamada a API

        // const response = await api.get('/auth/me', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        setUser({
          email: 'developer@gmail.com',
          username: 'Developer',
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function signIn(userData: SignInType) {
    try {
      //Todo: Implementar chamada a API
      // const response = await api.post('/auth/signin', {
      //   email: userData.email,
      //   password: userData.password,
      // });

      setUser({
        username: 'Developer',
        email: userData.email,
      });

      Cookies.set('token', 'my-secret-token', {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: userData.rememberMe ? 14 : undefined,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp(userData: SignUpType) {
    try {
      //Todo: Implementar chamada a API
      // const response = await api.post('/auth/signup', {
      //   email: userData.email,
      //   password: userData.password,
      //   username: userData.username,
      // });
    } catch (error) {
      console.log(error);
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

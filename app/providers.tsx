'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { DisabledProvider } from './context/DisabledContext';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <DisabledProvider>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider>
            <ToastContainer closeOnClick newestOnTop theme='dark' />
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </DisabledProvider>
    </AuthProvider>
  );
}

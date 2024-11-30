'use client';

import { useAuth } from '@/app/context/AuthContext';
import '@/styles/globals.css';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Menu from './menu';

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const pathname = usePathname();

  function handleSignOut() {
    signOut();

    router.push('/');
  }

  return (
    <div className='fixed w-full h-full flex flex-col'>
      <Menu />
      {children}
    </div>
  );
}

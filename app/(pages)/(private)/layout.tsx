'use client';

import { useAuth } from '@/app/context/AuthContext';
import { protestRevolution } from '@/config/fonts';
import '@/styles/globals.css';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    signOut();

    router.push('/');
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-14 bg-menu flex justify-between items-center px-16'>
        <div className='w-1/3 flex gap-2 justify-start items-center'>
          <img className='size-12' src='/favicon.webp' />
          <h1 className={`text-3xl ${protestRevolution.className}`}>
            ONDA RPG
          </h1>
        </div>
        <div className='w-1/3 flex justify-center'>
          <Button
            as={Link}
            href='/dashboard'
            className='transparent'
            variant='light'
          >
            Painel
          </Button>
          <Button
            as={Link}
            href='/account'
            className='transparent'
            variant='light'
          >
            Conta
          </Button>
        </div>
        <div className='w-1/3 flex justify-end'>
          <Button
            onPress={handleSignOut}
            className='transparent'
            variant='light'
            color='danger'
          >
            Sair
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}

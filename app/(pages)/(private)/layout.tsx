'use client';

import { useAuth } from '@/app/context/AuthContext';
import { protestRevolution } from '@/config/fonts';
import '@/styles/globals.css';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

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
    <div className='w-full h-full flex flex-col'>
      {!pathname.includes('portrait') && (
        <div className='w-full h-14 bg-menu flex justify-between items-center px-4 sm:px-16'>
          <div className='md:w-1/3 hidden md:flex flex-none gap-2 justify-start items-center'>
            <img className='size-12' src='/favicon.webp' />
            <h1 className={`text-3xl ${protestRevolution.className}`}>
              ONDA RPG
            </h1>
          </div>
          <div className='md:w-1/3 flex justify-center'>
            <Button
              as={Link}
              href='/dashboard'
              className='transparent text-base'
              variant='light'
            >
              Painel
            </Button>
            <Button
              as={Link}
              href='/account'
              className='transparent text-base'
              variant='light'
            >
              Conta
            </Button>
          </div>
          <div className='md:w-1/3 flex justify-end items-center gap-2'>
            <div className='hidden sm:flex items-center gap-1'>
              <BiUserCircle size={24} />
              {user ? <p>{user.username}</p> : <Spinner size='sm' />}
            </div>
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
      )}
      {children}
    </div>
  );
}

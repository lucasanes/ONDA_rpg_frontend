'use client';

import { useAuth } from '@/app/context/AuthContext';
import { ModalChangeVolume } from '@/components/modals/ModalChangeVolume';
import { protestRevolution } from '@/config/fonts';
import '@/styles/globals.css';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';

export default function Menu() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname();

  function handleSignOut() {
    signOut();

    router.push('/');
  }

  const show = !pathname.includes('portrait') && !pathname.includes('images');

  function handleDashboard() {
    setIsMenuOpen(false);
    router.push('/dashboard');
  }

  function handleAccount() {
    setIsMenuOpen(false);
    router.push('/account');
  }

  return (
    show && (
      <>
        <ModalChangeVolume
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className='bg-menu navbar'
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className='sm:hidden'
            />
            <NavbarBrand>
              <div className='md:w-1/3 hidden lg:flex flex-none gap-2 justify-start items-center'>
                <img className='size-12' src='/favicon.webp' />
                <h1 className={`text-3xl ${protestRevolution.className}`}>
                  ONDA RPG
                </h1>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            <NavbarItem>
              <Button
                as={Link}
                href='/dashboard'
                className='transparent text-base'
                variant='light'
              >
                Painel
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={onOpen}
                className='transparent text-base'
                variant='light'
              >
                Volume
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href='/account'
                className='transparent text-base'
                variant='light'
              >
                Conta
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify='end'>
            <NavbarItem className=''>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='light'>
                    <BiUserCircle size={24} />
                    {user ? (
                      <p className='capitalize'>{user.username}</p>
                    ) : (
                      <Spinner size='sm' color='current' />
                    )}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem
                    key='delete'
                    onPress={handleSignOut}
                    className='!text-danger'
                    color='default'
                  >
                    Sair
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            <NavbarMenuItem>
              <Button
                onPress={handleDashboard}
                className='w-full justify-start transparent text-base'
                variant='light'
              >
                Painel
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                onPress={onOpen}
                variant='light'
                className='w-full justify-start transparent text-base'
              >
                Volume
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                onPress={handleAccount}
                className='w-full justify-start transparent text-base'
                variant='light'
              >
                Conta
              </Button>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </>
    )
  );
}

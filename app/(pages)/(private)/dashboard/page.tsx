'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/AuthContext';

export default function Dashboard() {
  const { signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    signOut();

    router.push('/');
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-5'>
      <h1>test1e</h1>
      <Button color='danger' variant='bordered' onPress={handleSignOut}>
        Sair
      </Button>
    </div>
  );
}

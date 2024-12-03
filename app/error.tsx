'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='items-center flex flex-col mt-10 gap-8'>
      <h1 className='text-4xl'>Algo deu erro!</h1>
      <div className='flex gap-4'>
        <Button as={Link} href='/dashboard'>
          Voltar ao Painel
        </Button>
        <Button onPress={reset}>Tente Novamente</Button>
      </div>
    </div>
  );
}

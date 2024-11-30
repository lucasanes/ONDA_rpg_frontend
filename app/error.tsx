'use client';

import { Button } from '@nextui-org/button';
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
    <div className='items-center flex flex-col mt-10 gap-5'>
      <h1 className='text-4xl'>Algo deu erro!</h1>
      <Button onPress={reset}>Tente Novamente</Button>
    </div>
  );
}

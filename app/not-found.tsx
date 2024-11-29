'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Error() {
  const router = useRouter();

  const [time, setTime] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 1) {
        return;
      }

      setTime((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/');
    }, 4900);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='items-center flex flex-col mt-10 gap-5'>
      <h1 className='text-4xl'>404 - Página não encontrada</h1>
      <h2 className='text-2xl'>Oops! Parece que você se perdeu.</h2>
      <span className='text-xl'>Você será redirecionado em {time}...</span>
    </div>
  );
}

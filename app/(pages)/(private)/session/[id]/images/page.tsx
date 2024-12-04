'use client';

import { useSocket } from '@/app/context/SocketContext';
import { Image } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Images() {
  const { id } = useParams();
  const { onImage, onCleanImage } = useSocket();

  const [image, setImage] = useState<string>('');

  useEffect(() => {
    document.title = 'Images - ONDA RPG';

    onImage(Number(id), (data) => {
      setImage(data.image);
    });

    onCleanImage(Number(id), () => {
      setImage('');
    });
  }, []);

  return (
    <div className='w-full h-full'>
      <Image src={image} width='100%' height='100%' />
    </div>
  );
}

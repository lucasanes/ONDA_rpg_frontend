'use client';

import { useSocket } from '@/app/context/SocketContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Images() {
  const { id } = useParams();
  const { onImage, onCleanImage, cleanImageOff } = useSocket();

  const [image, setImage] = useState<string>('');

  useEffect(() => {
    document.title = 'Images - ONDA RPG';

    onImage(Number(id), (data) => {
      setImage(data.image);
    });

    onCleanImage(Number(id), () => {
      setImage('');
    });

    return () => {
      cleanImageOff(Number(id));
    };
  }, []);

  return (
    <div className='flex w-full h-full justify-center items-center'>
      {image && (
        <img
          src={image}
          className='max-w-full max-h-full w-full h-full object-contain'
        />
      )}
    </div>
  );
}

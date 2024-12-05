import { useDisabled } from '@/app/context/DisabledContext';
import { useSocket } from '@/app/context/SocketContext';
import { Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';

type Roll = {
  name: string;
  image: string;
  value: number;
  isD20: boolean;
  isCritical: boolean;
  isDisaster: boolean;
  createdAt: string;
};

export default function RollsContainer({
  sessionId,
}: {
  sessionId: number | null;
}) {
  const [rolls, setRolls] = useState<Roll[]>([]);

  const { disabled } = useDisabled();

  const { onRollDice } = useSocket();

  useEffect(() => {
    onRollDice(sessionId, null, (data) => {
      setRolls((prev) => [
        ...prev,
        {
          createdAt: new Date().toISOString(),
          name: 'Mestre',
          image:
            'https://m.media-amazon.com/images/S/pv-target-images/6e7c612490e10fc180d1ad5bacd2a3a39030c99cdd7dc0e49144425a6f8823fc._SX1080_FMjpg_.jpg',
          ...data,
        },
      ]);
    });
  }, []);

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col gap-2'>
      <div className='flex justify-start px-4 pt-4'>
        <h1 className='text-xl mb-2'>Rolagens</h1>
      </div>
      <Divider className='bg-gray-300 mt-2 h-0.5' />
      <div className='max-h-96 flex flex-col gap-4 p-4 overflow-y-auto'>
        {rolls
          .map((roll, index) => (
            <div
              key={index}
              className='flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4'
            >
              <div className='flex items-center gap-2'>
                <img
                  src={roll.image}
                  alt='person'
                  className='w-8 h-8 rounded-full'
                />
                <span>{roll.name}</span>
              </div>
              <Divider />
              <div className='flex items-center gap-2'>
                <span>{roll.value}</span>
                {roll.isD20 && (
                  <span className='text-sm font-bold text-gray-400'>D20</span>
                )}
                {roll.isCritical && (
                  <span className='text-sm font-bold text-red-500'>
                    Crítico
                  </span>
                )}
                {roll.isDisaster && (
                  <span className='text-sm font-bold text-red-500'>
                    Desastre
                  </span>
                )}
              </div>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
}

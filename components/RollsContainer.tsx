import { useSocket } from '@/app/context/SocketContext';
import { Card, CardBody, CardFooter, Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import IconButton from './IconButton';

type Dice = {
  total: number;
  dice: string;
  bonus: string;
  rollDices: {
    total: number;
    quantity: number;
    faces: number;
    rolls: number[];
  }[];
};

type Roll = {
  name: string;
  portrait: string | null;
  dice: Dice;
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
  const [reverse, setReverse] = useState<boolean>(true);

  const { onRollDice } = useSocket();

  useEffect(() => {
    setRolls([]);
    setReverse(true);

    const rollsStorage = localStorage.getItem('@ONDA:rolls');

    const rolls = rollsStorage ? JSON.parse(rollsStorage) : [];

    setRolls(rolls);

    onRollDice(sessionId, null, (data) => {
      console.log(sessionId, data);

      const createdAt = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const rollsStorage = localStorage.getItem('@ONDA:rolls');

      const rolls = rollsStorage ? JSON.parse(rollsStorage) : [];

      setRolls([
        ...rolls,
        {
          createdAt,
          ...data,
        },
      ]);

      localStorage.setItem(
        '@ONDA:rolls',
        JSON.stringify([
          ...rolls,
          {
            createdAt,
            ...data,
          },
        ])
      );
    });
  }, []);

  function handleClear() {
    setRolls([]);
    localStorage.setItem('@ONDA:rolls', JSON.stringify([]));
  }

  function handleReverse() {
    setReverse((prev) => !prev);
  }

  const viewRolls = reverse ? rolls.reverse() : rolls;

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col gap-2'>
      <div className='flex justify-between items-center px-4 pt-4'>
        <h1 className='text-xl'>Rolagens</h1>
        <div className='flex gap-2'>
          <IconButton onPress={handleClear}>
            <AiOutlineClear size={20} />
          </IconButton>
          <IconButton onPress={handleReverse}>
            <BsArrowRepeat size={20} />
          </IconButton>
        </div>
      </div>
      <Divider className='bg-gray-300 mt-2 h-0.5' />
      <div
        style={{ maxHeight: 500 }}
        className='flex flex-col gap-4 p-4 overflow-y-auto'
      >
        {viewRolls.map((roll, index) => (
          <div
            key={index}
            className='flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4'
          >
            <div className='flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2 mb-1'>
                <img
                  src={roll.portrait || '/noportrait.png'}
                  alt='person'
                  className='w-12 h-12 rounded-full aspect-square object-cover border-1 border-gray-300'
                />
                <span className='text-xl'>{roll.name}</span>
              </div>
              <span>{roll.createdAt}</span>
            </div>
            <Divider />
            <Card className='w-full bg-transparent mt-2'>
              <CardBody className='flex justify-start py-5'>
                <h2
                  className={`text-lg ${roll.isCritical && 'text-green-400'} ${roll.isDisaster && 'text-red-500'}`}
                >
                  {roll.dice.rollDices.map((roll) => roll.total).join('+')}
                  {`+${roll.dice.bonus}`} = {roll.dice.total}
                </h2>
              </CardBody>
              <Divider />
              <CardFooter className='flex flex-col justify-center items-start'>
                {roll.dice.rollDices.map((roll, i) => (
                  <span key={i} className='text-md'>
                    {roll.quantity}d{roll.faces}:{' '}
                    {roll.rolls.map((r) => r).join(', ')}
                  </span>
                ))}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

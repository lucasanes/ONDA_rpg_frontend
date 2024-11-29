'use client';

import { specialElite } from '@/config/fonts';
import { CharacterInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { Input } from '@nextui-org/input';
import { Button, Divider, Image, Progress, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Character() {
  const [loading, setLoading] = useState(true);

  const [character, setCharacter] = useState<CharacterInterface>(
    {} as CharacterInterface
  );

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const response = await api.get(`/characters/${id}`);

      setCharacter({
        id: 1,
        name: 'Naksu Hanna',
        class: 'Arcanista',
        divinity: 'Aisha',
        level: 1,
        race: 'Humano',
        xp: 10,
        sessionId: 1,
        portrait:
          'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
        pv: 100,
        pvA: 70,
        pm: 50,
        pmA: 40,
        munA: 30,
        mun: 30,
        dying: false,
        fighting: false,
        hurted: false,
        tired: false,
        unconscious: false,
        to: 1,
        ts: 100,
        tp: 10,
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function updateCharacterField<T extends keyof CharacterInterface>(
    field: T,
    value: CharacterInterface[T]
  ) {
    setCharacter((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return loading ? (
    <Spinner size='lg' className='mt-6' />
  ) : (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 p-4 gap-4 overflow-x-auto'>
        <MainContainer character={character} />
        <StatusContainer
          character={character}
          onUpdate={updateCharacterField}
        />
      </div>
    </>
  );
}

function MainContainer({ character }: { character: CharacterInterface }) {
  const { name, level, xp, divinity, race, ts, to, tp } = character;

  return (
    <div className='border-2 border-gray-500 rounded-sm flex flex-col p-4 gap-2'>
      <h1>Principal</h1>
      <Divider />
      <Input variant='bordered' size='md' disabled label='Nome' value={name} />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Level'
        value={level.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='XP'
        value={xp.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Classe'
        value={character.class}
      />
      <Input variant='bordered' size='md' disabled label='Raça' value={race} />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Divindade'
        value={divinity}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='T$'
        value={ts.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='TP'
        value={tp.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='TO'
        value={to.toString()}
      />
    </div>
  );
}

function StatusContainer({
  character,
  onUpdate,
}: {
  character: CharacterInterface;
  onUpdate: (field: keyof CharacterInterface, value: any) => void;
}) {
  const { id, pv, pvA, pm, pmA, portrait, dying, fighting, unconscious } =
    character;

  const router = useRouter();

  function handleFight() {
    //ToDo: Implementar chamada Socket

    onUpdate('fighting', !fighting);
  }

  return (
    <div className='border-2 border-gray-500 rounded-sm flex flex-col p-4 gap-2'>
      <div className='flex gap-10'>
        <div className='border-2 border-gray-400 rounded-md flex flex-col items-center'>
          <h1 className='my-1 text-lg text-center'>Status</h1>
          <Divider />
          <div className='flex flex-col gap-4 p-4'>
            <Button
              className={`bg-fight ${fighting ? 'opacity-100' : 'opacity-50'}`}
              onPress={handleFight}
            >
              Combate
            </Button>
            <Button
              className='bg-red-500'
              onPress={() => onUpdate('dying', !dying)}
            >
              Morrendo
            </Button>
            <Button
              className='bg-red-500'
              onPress={() => onUpdate('unconscious', !unconscious)}
            >
              Inconsciente
            </Button>
          </div>
        </div>
        <Image
          radius='full'
          onClick={() => router.push(`/character/${id}/portrait`)}
          className='min-w-64 min-h-64 max-w-64 max-h-64 aspect-square object-cover border-2 cursor-pointer'
          src={portrait || '/noportrait.png'}
        />
      </div>

      <Progress
        label={`PV: ${pvA}/${pv}`}
        classNames={{
          indicator: 'bg-red-700',
        }}
        maxValue={pv}
        value={pvA}
      />

      <Progress
        label={`PM: ${pmA}/${pm}`}
        classNames={{
          indicator: 'bg-blue-700',
        }}
        maxValue={pm}
        value={pmA}
      />
      <div className='flex items-center gap-1'>
        <img src='/coin.png' width={25} height={25} />
        <span className={`text-xl mt-1 ${specialElite.className}`}>
          {convertMoney(character)}
        </span>
      </div>
    </div>
  );
}

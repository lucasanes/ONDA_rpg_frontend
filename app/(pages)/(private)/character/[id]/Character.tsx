'use client';

import { specialElite } from '@/config/fonts';
import { CharacterInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { Input } from '@nextui-org/input';
import { Button, Divider, Progress, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiCoin } from 'react-icons/bi';
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
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <h1 className='text-xl'>Principal</h1>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
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
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar $'
        value={ts.toString()}
      />
      <Input
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar de Prata $'
        value={tp.toString()}
      />
      <Input
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar de Ouro $'
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
  const {
    id,
    pv,
    pvA,
    pm,
    pmA,
    mun,
    munA,
    portrait,
    dying,
    fighting,
    unconscious,
    tired,
    hurted,
  } = character;

  const router = useRouter();

  function handleFighting() {
    //ToDo: Implementar chamada Socket

    onUpdate('fighting', !fighting);
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <h1 className='text-xl'>Status</h1>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <div className='flex flex-col-reverse xl:flex-row gap-10 justify-evenly items-center'>
        <div className='border-2 border-gray-400 rounded-md flex flex-col items-center'>
          <h1 className='my-1 text-lg text-center'>Status</h1>
          <Divider />
          <div className='min-w-60 flex flex-col gap-4 p-4'>
            <Button
              className={`border-2 border-fighting text-gray-200 ${fighting ? 'bg-fighting-50' : 'bg-transparent'}`}
              onPress={handleFighting}
            >
              Combate
            </Button>
            <Button
              className={`border-2 border-tired text-gray-200 ${tired ? 'bg-tired-50' : 'bg-transparent'}`}
              onPress={() => onUpdate('tired', !tired)}
            >
              Cansado
            </Button>
            <Button
              className={`border-2 border-hurted text-gray-200 ${hurted ? 'bg-hurted-50' : 'bg-transparent'}`}
              onPress={() => onUpdate('hurted', !hurted)}
            >
              Ferimento Médio
            </Button>
            <Button
              className={`border-2 border-dying text-gray-200 ${dying ? 'bg-dying-50' : 'bg-transparent'}`}
              onPress={() => onUpdate('dying', !dying)}
            >
              Ferimento Grave
            </Button>
            <Button
              className={`border-2 border-unconscious text-gray-200 ${unconscious ? 'bg-unconscious-50' : 'bg-transparent'}`}
              onPress={() => onUpdate('unconscious', !unconscious)}
            >
              Inconsciente
            </Button>
          </div>
        </div>
        <div className='relative min-w-64 min-h-64 max-w-64 max-h-64 cursor-pointer'>
          <div className='z-10 absolute min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover border-2'></div>
          <img
            style={{
              width: 250,
              height: 250,
            }}
            src='/blood2.png'
            className={`absolute z-20 left-12 top-12 rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-90' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
          />
          <img
            style={{
              width: 250,
              height: 250,
            }}
            src='/blood1.png'
            className={`absolute z-20 left-12 top-12 rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-80' : `opacity-0`} ${unconscious ? 'blur-sm' : ''}`}
          />
          <img
            onClick={() => router.push(`/character/${id}/portrait`)}
            className={`z-0 min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'} ${tired ? 'grayscale' : ''}`}
            src={portrait || '/noportrait.png'}
          />
        </div>
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

      <Progress
        label={`Munição: ${munA}/${mun}`}
        classNames={{
          indicator: 'bg-green-400',
        }}
        maxValue={mun}
        value={munA}
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

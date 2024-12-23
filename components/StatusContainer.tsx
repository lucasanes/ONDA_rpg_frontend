import { useDisabled } from '@/app/context/DisabledContext';
import { useSocket } from '@/app/context/SocketContext';
import { api } from '@/providers/api';
import {
  StatusBarCharacterInterface,
  StatusCharacterInterface,
} from '@/types/character';
import { xpToLevel, xpToNextLevel } from '@/utils/xp-level';
import {
  Button,
  Chip,
  Divider,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import EditButton from './EditButton';
import ModalEditStatus from './modals/ModalEditStatus';
import StatusBar from './StatusBar';

export function StatusContainer({
  id,
  initialStatusCharacter,
}: {
  id: number;
  initialStatusCharacter: StatusCharacterInterface;
}) {
  const [statusCharacter, setStatusCharacter] =
    useState<StatusCharacterInterface>(initialStatusCharacter);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const xpRef = useRef<HTMLDivElement>(null);

  const {
    hp,
    currentHp,
    mp,
    currentMp,
    xp,
    mun,
    currentMun,
    moldure: initialMoldure,
    portrait,
    dying,
    fighting,
    unconscious,
    tired,
    hurted,
    cd,
    defense,
  } = statusCharacter;

  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const [moldure, setMoldure] = useState(initialMoldure);

  const {
    emitStatusCharacter,
    onStatusCharacter,
    onXPCharacter,
    statusCharacterOff,
    xpCharacterOff,
  } = useSocket();

  function updateXP(currentXP: number) {
    const xpProgressRef = xpRef.current;

    if (!xpProgressRef) return;

    const quantityXPOfCurrentLevel = xpToNextLevel(xpToLevel(currentXP));
    const quantityXPToNextLevel = xpToNextLevel(xpToLevel(currentXP) + 1);

    const percentage =
      ((currentXP - quantityXPOfCurrentLevel) /
        (quantityXPToNextLevel - quantityXPOfCurrentLevel)) *
      100;

    const degree = (percentage / 100) * 360; // Converte para graus
    xpProgressRef.style.background = `conic-gradient(#43ff5c 0deg ${degree}deg, white ${degree}deg 360deg)`;
  }

  useEffect(() => {
    updateXP(xp);

    onStatusCharacter(Number(id), (status) => {
      setStatusCharacter((prev) => ({ ...prev, [status.key]: status.value }));
    });

    onXPCharacter(Number(id), (data) => {
      setStatusCharacter((prev) => ({ ...prev, xp: data.xp }));
      updateXP(data.xp);
    });

    return () => {
      statusCharacterOff(Number(id));
      xpCharacterOff(Number(id));
    };
  }, []);

  useEffect(() => {
    if (currentHp < hp / 2 && currentHp >= hp / 4 && currentHp > 0 && !hurted) {
      handleHurted(true);
    }

    if (currentHp >= hp / 2 && hurted) {
      handleHurted(false);
    }

    if (currentHp < hp / 4 && !dying) {
      handleDying(true);

      if (hurted) {
        handleHurted(false);
      }
    }

    if (currentHp >= hp / 4 && dying) {
      handleDying(false);
    }

    if (currentMp < mp / 4 && !tired) {
      handleTired(true);
    }

    if (currentMp >= mp / 4 && tired) {
      handleTired(false);
    }
  }, [currentHp, hp, currentMp, mp]);

  function handleFighting(boolean: boolean) {
    emitStatusCharacter(
      { value: boolean, key: 'fighting', characterId: id },
      () => {
        setStatusCharacter((prev) => ({
          ...prev,
          fighting: boolean,
        }));
      }
    );
  }

  function handleTired(boolean: boolean) {
    emitStatusCharacter(
      { value: boolean, key: 'tired', characterId: id },
      () => {
        setStatusCharacter((prev) => ({
          ...prev,
          tired: boolean,
        }));
      }
    );
  }

  function handleHurted(boolean: boolean) {
    emitStatusCharacter(
      { value: boolean, key: 'hurted', characterId: id },
      () => {
        setStatusCharacter((prev) => ({
          ...prev,
          hurted: boolean,
        }));
      }
    );
  }

  function handleDying(boolean: boolean) {
    emitStatusCharacter(
      { value: boolean, key: 'dying', characterId: id },
      () => {
        setStatusCharacter((prev) => ({
          ...prev,
          dying: boolean,
        }));
      }
    );
  }

  function handleUnconscious(boolean: boolean) {
    emitStatusCharacter(
      { value: boolean, key: 'unconscious', characterId: id },
      () => {
        setStatusCharacter((prev) => ({
          ...prev,
          unconscious: boolean,
        }));
      }
    );
  }

  function onUpdate(key: keyof StatusBarCharacterInterface, value: number) {
    emitStatusCharacter({ value, key, characterId: id }, () => {
      setStatusCharacter((prev) => ({
        ...prev,
        [key]: value,
      }));
    });

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      updateApi(key, value, {
        hp,
        currentHp,
        mp,
        currentMp,
        mun,
        currentMun,
      });
    }, 3000);
  }

  async function updateApi(
    key: keyof StatusBarCharacterInterface,
    value: number,
    statusCharacter: Partial<StatusBarCharacterInterface>
  ) {
    try {
      await api.put(`/characters/${id}/status`, {
        ...statusCharacter,
        [key]: value,
        cd,
        defense,
        portrait,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleMoldure(value: number) {
    try {
      await api.put(`/characters/${id}/status`, {
        ...statusCharacter,
        moldure: value,
        cd,
        defense,
        portrait,
      });

      setMoldure(value);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalEditStatus
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        statusCharacter={statusCharacter}
        setStatusCharacter={setStatusCharacter}
      />
      <div className='flex justify-between'>
        <h1 className='text-xl'>Status</h1>
        <EditButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <div className='flex flex-col-reverse xl:flex-row gap-10 justify-evenly items-center'>
        <div className='border-2 border-gray-400 rounded-md flex flex-col items-center'>
          <h1 className='my-1 text-lg text-center'>Portrait</h1>
          <Divider className='bg-gray-300' />
          <div className='min-w-60 flex flex-col gap-4 p-4'>
            <Button
              className={`border-2 border-fighting text-gray-200 ${fighting ? 'bg-fighting-50' : 'bg-transparent'}`}
              onPress={() => handleFighting(!fighting)}
              isDisabled={disabled}
            >
              Combate
            </Button>
            <Button
              className={`border-2 border-tired text-gray-200 ${tired ? 'bg-tired-50' : 'bg-transparent'}`}
              onPress={() => handleTired(!tired)}
              isDisabled={disabled}
            >
              Cansado
            </Button>
            <Button
              className={`border-2 border-hurted text-gray-200 ${hurted ? 'bg-hurted-50' : 'bg-transparent'}`}
              onPress={() => handleHurted(!hurted)}
              isDisabled={disabled}
            >
              Ferimento Médio
            </Button>
            <Button
              className={`border-2 border-dying text-gray-200 ${dying ? 'bg-dying-50' : 'bg-transparent'}`}
              onPress={() => handleDying(!dying)}
              isDisabled={disabled}
            >
              Ferimento Grave
            </Button>
            <Button
              className={`border-2 border-unconscious text-gray-200 ${unconscious ? 'bg-unconscious-50' : 'bg-transparent'}`}
              onPress={() => handleUnconscious(!unconscious)}
              isDisabled={disabled}
            >
              Inconsciente
            </Button>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-6'>
          <Tabs
            selectedKey={moldure.toString()}
            onSelectionChange={(key) => handleMoldure(Number(key))}
          >
            <Tab key='1' title='1' />
            <Tab key='2' title='2' />
          </Tabs>
          <Link
            href={`/character/${id}/portrait`}
            className='relative min-w-64 min-h-64 max-w-64 max-h-64 rounded-full cursor-pointer'
          >
            {/* <div className='z-10 absolute min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover border-2'></div> */}
            <img
              style={{
                width: 350,
                height: 350,
              }}
              src='/blood2.png'
              className={`absolute z-20 -bottom-12 rounded-full rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-90' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
            />
            <img
              style={{
                width: 250,
                height: 250,
              }}
              src='/blood1.png'
              className={`absolute z-20 left-2 bottom-3 rounded-full rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-80' : `opacity-0`} ${unconscious ? 'blur-sm' : ''}`}
            />
            <img
              className={`z-0 w-64 h-64 rounded-full aspect-square object-cover transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'} ${tired ? 'grayscale' : ''}`}
              src={portrait || '/noportrait.png'}
            />
            <div
              ref={xpRef}
              className='absolute w-64 h-64 z-30 inset-0 rounded-full'
              style={{
                background: 'conic-gradient(#43ff5c 0deg, white 0deg 360deg)',
                maskImage:
                  'radial-gradient(closest-side, transparent 97%, black 0%)',
                WebkitMaskImage:
                  'radial-gradient(closest-side, transparent 97%, black 0%)',
              }}
            ></div>
            {/* <img
            className={`z-0 min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'} ${tired ? 'grayscale' : ''}`}
            src={portrait || '/noportrait.png'}
          /> */}
          </Link>
        </div>
      </div>

      <span className='mt-3 text-center'>Vida</span>

      <StatusBar
        currentValue={currentHp}
        maxValue={hp}
        onCurrentValueUpdate={(value) => onUpdate('currentHp', value)}
        onMaxValueUpdate={(value) => onUpdate('hp', value)}
        color='bg-red-700'
      />

      <span className='mt-3 text-center'>Mana</span>

      <StatusBar
        currentValue={currentMp}
        maxValue={mp}
        onCurrentValueUpdate={(value) => onUpdate('currentMp', value)}
        onMaxValueUpdate={(value) => onUpdate('mp', value)}
        color='bg-blue-700'
      />

      <span className='mt-3 text-center'>Munição</span>

      <StatusBar
        currentValue={currentMun}
        maxValue={mun}
        onCurrentValueUpdate={(value) => onUpdate('currentMun', value)}
        onMaxValueUpdate={(value) => onUpdate('mun', value)}
        color='bg-green-400'
      />

      <div className='w-full flex flex-wrap justify-center gap-5 mt-5'>
        <Chip>{`Defesa (CA): ${defense}`}</Chip>
        <Chip>{`Classe de Dificuldade (CD): ${cd}`}</Chip>
      </div>
    </div>
  );
}

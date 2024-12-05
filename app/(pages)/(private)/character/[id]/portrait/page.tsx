'use client';

import { useSocket } from '@/app/context/SocketContext';
import { imFellEnglish, specialElite } from '@/config/fonts';
import { api } from '@/providers/api';
import { CharacterPortraitInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { IMAGE_SIZE } from '@/utils/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Portrait() {
  const [loading, setLoading] = useState(true);

  const [character, setCharacter] = useState<CharacterPortraitInterface>(
    {} as CharacterPortraitInterface
  );

  const [showMoney, setShowMoney] = useState(false);
  const [showMun, setShowMun] = useState(false);

  const { id } = useParams();

  const { onStatusCharacter, statusCharacterOff } = useSocket();

  async function fetchData() {
    try {
      const response = await api.get(`/characters/${id}/portrait`);

      document.title = `Portrait ${response.data.name} - ONDA RPG`;

      setCharacter({
        ...response.data,
        money: convertMoney(response.data),
        fighting: false,
        tired: false,
        hurted: false,
        unconscious: false,
        dying: false,
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

    onStatusCharacter(Number(id), (data) => {
      setCharacter((prev) => ({
        ...prev,
        [data.key]: data.value,
      }));

      if (data.key === 'currentMun') {
        setShowMun(true);
        setTimeout(() => setShowMun(false), 5000);
      }

      if (data.key === 'money') {
        setShowMoney(true);
        setTimeout(() => setShowMoney(false), 5000);
      }
    });

    return () => {
      statusCharacterOff(Number(id));
    };
  }, []);

  return (
    !loading && (
      <div className='w-full h-full overflow-auto p-10'>
        <div className='relative flex justify-start items-center'>
          <div className='relative'>
            <Dice characterId={Number(id)} />
            <Hurted
              hurted={character.hurted}
              unconscious={character.unconscious}
            />
            <Dying
              dying={character.dying}
              unconscious={character.unconscious}
            />
            <div
              style={{
                top: `${IMAGE_SIZE - 125}px`,
                left: `${IMAGE_SIZE - 50}px`,
              }}
              className='absolute z-40 flex flex-col gap-2 justify-center items-start'
            >
              <Money money={character.money} showMoney={showMoney} />
              <Munition munition={character.currentMun} showMun={showMun} />
            </div>
            <PortraitImage
              portrait={character.portrait}
              unconscious={character.unconscious}
              tired={character.tired}
            />
          </div>
          <NameOrStatus
            name={character.name}
            fighting={character.fighting}
            mp={character.mp}
            currentMp={character.currentMp}
            hp={character.hp}
            currentHp={character.currentHp}
          />
        </div>
      </div>
    )
  );
}

function Dice({ characterId }: { characterId: number | null }) {
  const [key, setKey] = useState(0);
  const [dice, setDice] = useState<'normal' | 'disaster' | 'critic'>('normal');
  const [value, setValue] = useState(0);
  const [isD20, setIsD20] = useState(false);

  const { onRollDice, rollDiceOff } = useSocket();

  useEffect(() => {
    onRollDice(null, characterId, (data) => {
      setValue(data.dice.total);

      if (data.isCritical) {
        setDice('critic');
      } else if (data.isDisaster) {
        setDice('disaster');
      } else {
        setDice('normal');
      }

      setIsD20(data.isD20);

      setKey((prev) => prev + 1);
    });

    return () => {
      rollDiceOff(null, characterId);
    };
  }, []);

  return (
    key > 0 && (
      <div key={key} className='relative'>
        <span
          style={{
            top: `${IMAGE_SIZE - 320}px`,
            left: `${IMAGE_SIZE - 370}px`,
            WebkitTextStroke: `2px ${isD20 ? '#00b4dc' : '#ff6200'}`,
            textShadow: `
            ${isD20 ? '#00b4dc' : '#ff6200'} 0 0 30px, 
            #000000 5px 5px 5px,
            #000000 5px 5px 10px,
            #000000 5px 5px 15px,
            #000000 5px 5px 20px
          `,
          }}
          className={`z-50 absolute text-9xl w-52 text-center opacity-0 ${specialElite.className} 
            ${
              dice == 'critic'
                ? 'animate-criticalTextDice'
                : dice == 'disaster'
                  ? 'animate-disasterTextDice'
                  : 'animate-textDice'
            }`}
        >
          {value}
        </span>
        <video
          style={{
            width: IMAGE_SIZE + 50,
            height: IMAGE_SIZE + 50,
          }}
          src={`/video/${dice}-dice.webm`}
          autoPlay
          muted
          className='ml-2 absolute z-40'
        />
      </div>
    )
  );
}

function Munition({
  munition,
  showMun,
}: {
  munition: number;
  showMun: boolean;
}) {
  return (
    <div
      className={`ml z-40 flex items-center justify-center transition duration-1000 ease-in-out ${
        showMun ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img width={17} src='/munition.png' />
      <span
        style={{
          textShadow: '0 0 5px #1ee176, 0 0 7px #1ee176',
        }}
        className={`text-5xl mt-4 ml-3 font-bold text-white transition duration-1000 ease-in-out ${specialElite.className} ${
          showMun ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {munition}
      </span>
    </div>
  );
}

function Money({ money, showMoney }: { money: number; showMoney: boolean }) {
  return (
    <div
      className={`z-40 flex items-center justify-center transition duration-1000 ease-in-out ${
        showMoney ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img width={50} height={50} src='/coin.png' />
      <span
        style={{
          textShadow: '0 0 5px #d5c113, 0 0 7px #d5c113',
        }}
        className={`text-5xl mt-2 font-bold text-white transition duration-1000 ease-in-out ${specialElite.className} ${
          showMoney ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {money}
      </span>
    </div>
  );
}

function Hurted({
  hurted,
  unconscious,
}: {
  hurted: boolean;
  unconscious: boolean;
}) {
  return (
    <img
      style={{
        width: IMAGE_SIZE - 50,
        height: IMAGE_SIZE - 50,
      }}
      src='/blood1.png'
      className={`absolute left-12 top-12 z-20 rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-60' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
    />
  );
}

function Dying({
  dying,
  unconscious,
}: {
  dying: boolean;
  unconscious: boolean;
}) {
  return (
    <img
      style={{
        width: IMAGE_SIZE + 50,
        height: IMAGE_SIZE + 50,
      }}
      src='/blood2.png'
      className={`absolute z-20 rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-75' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
    />
  );
}

function PortraitImage({
  portrait,
  unconscious,
  tired,
}: {
  portrait: string | null;
  unconscious: boolean;
  tired: boolean;
}) {
  return (
    <>
      <img
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
        }}
        className={`absolute left-6 top-6 aspect-square object-cover rounded-full transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0  animate-breathing'} ${tired ? 'grayscale' : ''}`}
        src={portrait || '/noportrait.png'}
      />
      <img
        src={'/moldure1.png'}
        style={{
          minWidth: IMAGE_SIZE + 50,
          minHeight: IMAGE_SIZE + 50,
          maxWidth: IMAGE_SIZE + 50,
          maxHeight: IMAGE_SIZE + 50,
        }}
        className='relative z-10'
      ></img>
    </>
  );
}

function NameOrStatus({
  name,
  fighting,
  currentHp,
  hp,
  currentMp,
  mp,
}: {
  name: string;
  fighting: boolean;
  currentHp: number;
  hp: number;
  currentMp: number;
  mp: number;
}) {
  const splitedName = name.split(' ');

  const firstName = splitedName[0];
  const lastName = splitedName[1];

  return (
    <div className='w-96 h-96 absolute left-96 ml-72 flex justify-start items-center'>
      <div
        className={`absolute flex flex-col ml-16 mt-6 mb-6 ${!fighting ? 'opacity-100' : 'opacity-0'} transition ${!fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <p
          style={{
            textShadow: '0 0 1rem #7be4ef, 0 0 1rem #7be4ef',
          }}
          className={`text-9xl italic rotate-3 mb-2 capitalize ${imFellEnglish.className}`}
        >
          {firstName}
        </p>
        <p
          style={{
            textShadow: '0 0 1rem #7be4ef, 0 0 1rem #7be4ef',
          }}
          className={`text-9xl italic rotate-3 mt-2 capitalize ${imFellEnglish.className}`}
        >
          {lastName}
        </p>
      </div>

      <div
        className={`absolute ml-16 mt-10 flex flex-col ${fighting ? 'opacity-100' : 'opacity-0'} transition ${fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <span
          style={{
            textShadow: '0 0 1rem #951818, 0 0 1rem #951818',
          }}
          className={`text-9xl italic text-red-500 rotate-6 shadow-white ${specialElite.className}`}
        >
          {currentHp}/{hp}
        </span>
        <span
          style={{
            textShadow: '0 0 1rem #2828c9, 0 0 1rem #2828c9',
          }}
          className={`text-9xl italic text-blue-500 rotate-6 ${specialElite.className}`}
        >
          {currentMp}/{mp}
        </span>
      </div>
    </div>
  );
}

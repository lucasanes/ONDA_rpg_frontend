'use client';

import { imFellEnglish, specialElite } from '@/config/fonts';
import { CharacterPortraitInterface } from '@/types/character';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const imageSize = 600;

export default function Portrait() {
  const [character, setCharacter] = useState<CharacterPortraitInterface>(
    {} as CharacterPortraitInterface
  );

  const [showStatus, setShowStatus] = useState(false);

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const response = await api.get(`/characters/${id}`);

      //setCharacter(response.data);

      setCharacter({
        id: 1,
        name: 'Naksu Hanna',
        pvA: 17,
        pv: 20,
        money: 9854,
        pmA: 5,
        pm: 10,
        dying: false,
        munA: 10,
        fighting: false,
        hurted: false,
        tired: false,
        unconscious: false,
        portrait:
          'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar dados');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='flex gap-10'>
        <button
          onClick={() =>
            setCharacter((prev) => ({
              ...prev,
              fighting: !prev.fighting,
            }))
          }
        >
          combate
        </button>

        <button
          onClick={() =>
            setCharacter((prev) => ({
              ...prev,
              tired: !prev.tired,
            }))
          }
        >
          cansado
        </button>

        <button
          onClick={() =>
            setCharacter((prev) => ({
              ...prev,
              hurted: !prev.hurted,
            }))
          }
        >
          machucado
        </button>

        <button
          onClick={() =>
            setCharacter((prev) => ({
              ...prev,
              unconscious: !prev.unconscious,
            }))
          }
        >
          inconsciente
        </button>

        <button
          onClick={() =>
            setCharacter((prev) => ({
              ...prev,
              dying: !prev.dying,
            }))
          }
        >
          morrendo
        </button>
      </div>

      <div className='w-full h-full flex justify-start items-center p-20'>
        <div
          style={{ width: imageSize, height: imageSize }}
          className='absolute z-30 bg-transparent border-8 border-black rounded-full'
        ></div>
        <Hurted hurted={character.hurted} unconscious={character.unconscious} />
        <Money money={character.money} />
        <Munition munition={character.munA} />
        <PortraitImage
          portrait={character.portrait}
          unconscious={character.unconscious}
        />
        <div
          style={{ minWidth: imageSize, minHeight: imageSize }}
          className='z-10 bg-gray-400 rounded-full'
        ></div>
        <NameOrStatus character={character} />
      </div>
    </>
  );
}

function Money({ money }: { money: number }) {
  return (
    <div
      className={`absolute z-40 flex items-center justify-center w-16 h-16 rounded-full shadow-md`}
    >
      <img width={32} height={32} src='/money.jpeg' />
      <span className={`text-2xl font-bold text-white`}>{money}</span>
    </div>
  );
}

function Munition({ munition }: { munition: number }) {
  return (
    <div
      className={`absolute z-40 flex items-center justify-center w-16 h-16 rounded-full shadow-md`}
    >
      <img width={32} height={32} src='/munition.png' />
      <span className={`text-2xl font-bold text-white`}>{munition}</span>
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
      width={imageSize}
      height={imageSize}
      src='/blood.png'
      className={`absolute z-40 rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-75' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
    />
  );
}

function PortraitImage({
  portrait,
  unconscious,
}: {
  portrait: string | null;
  unconscious: boolean;
}) {
  return (
    <img
      width={imageSize}
      height={imageSize}
      className={`absolute z-20 aspect-square object-cover rounded-full transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'}`}
      src={portrait || '/noportrait.png'}
    />
  );
}

function NameOrStatus({
  character,
}: {
  character: CharacterPortraitInterface;
}) {
  const name = character?.name || ' ';

  const splitedName = name.split(' ');

  const firstName = splitedName[0];
  const lastName = splitedName[1];

  return (
    <>
      <div
        className={`flex flex-col ml-12 mt-4 ${!character.fighting ? 'opacity-100' : 'opacity-0'} transition ${!character.fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <p
          style={{
            textShadow: '0 0 1rem #e1891e, 0 0 1rem #ef5151',
          }}
          className={`text-9xl italic rotate-3 ${imFellEnglish.className}`}
        >
          {firstName}
        </p>
        <p
          style={{
            textShadow: '0 0 1rem #e1891e, 0 0 1rem #ef5151',
          }}
          className={`text-9xl italic rotate-3 ${imFellEnglish.className}`}
        >
          {lastName}
        </p>
      </div>

      <div
        className={`relative -left-96 flex flex-col ml-12 mt-8 ${character.fighting ? 'opacity-100' : 'opacity-0'} transition ${character.fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <span
          style={{
            textShadow: '0 0 1rem #951818, 0 0 1rem #951818',
          }}
          className={`text-9xl italic text-red-500 rotate-3 shadow-white ${specialElite.className}`}
        >
          {character.pvA}/{character.pv}
        </span>
        <span
          style={{
            textShadow: '0 0 1rem #2828c9, 0 0 1rem #2828c9',
          }}
          className={`text-9xl italic text-blue-500 rotate-3 ${specialElite.className}`}
        >
          {character.pmA}/{character.pm}
        </span>
      </div>
    </>
  );
}

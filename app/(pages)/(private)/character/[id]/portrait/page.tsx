'use client';

import { imFellEnglish, specialElite } from '@/config/fonts';
import { CharacterPortraitInterface } from '@/types/character';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const imageSize = 650;

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
        pmA: 5,
        pm: 10,
        dying: false,
        fight: false,
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
              fight: !prev.fight,
            }))
          }
        >
          combate
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
        <Blood dying={character.dying} />
        <PortraitImage
          portrait={character.portrait || '/noportrait'}
          unconscious={character.unconscious}
        />
        <div
          style={{ width: imageSize, height: imageSize }}
          className='z-10 bg-gray-400 rounded-full'
        ></div>
        <NameOrStatus character={character} />
      </div>
    </>
  );
}

function Blood({ dying }: { dying: boolean }) {
  return (
    <img
      width={imageSize}
      height={imageSize}
      src='/blood.png'
      className={`absolute z-40 rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

function PortraitImage({
  portrait,
  unconscious,
}: {
  portrait: string;
  unconscious: boolean;
}) {
  return (
    <img
      width={imageSize}
      height={imageSize}
      className={`absolute z-20 aspect-square object-cover rounded-full transition duration-700 ease-in-out ${unconscious ? 'brightness-0' : 'brightness-100'}`}
      src={portrait}
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
        className={`flex flex-col ml-12 mt-4 ${!character.fight ? 'opacity-100' : 'opacity-0'} transition ${!character.fight ? 'duration-1000' : 'duration-500'} ease-in-out`}
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
        className={`relative -left-96 flex flex-col ml-12 mt-8 ${character.fight ? 'opacity-100' : 'opacity-0'} transition ${character.fight ? 'duration-1000' : 'duration-500'} ease-in-out`}
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

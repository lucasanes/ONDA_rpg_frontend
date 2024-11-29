'use client';

import { imFellEnglish, specialElite } from '@/config/fonts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const imageSize = 600;

export default function Portrait() {
  const [name, setName] = useState('');
  const [portrait, setPortrait] = useState('');

  const [fighting, setFighting] = useState(false);
  const [tired, setTired] = useState(false);
  const [hurted, setHurted] = useState(false);
  const [unconscious, setUnconscious] = useState(false);
  const [dying, setDying] = useState(false);

  const [munA, setMunA] = useState(0);
  const [money, setMoney] = useState(0);

  const [pvA, setPvA] = useState(0);
  const [pv, setPv] = useState(0);
  const [pmA, setPmA] = useState(0);
  const [pm, setPm] = useState(0);

  const [showMun, setShowMun] = useState(false);
  const [showMoney, setShowMoney] = useState(false);

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const response = await api.get(`/characters/${id}`);

      setName('Naksu Hanna');
      setPortrait(
        'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201'
      );

      setPvA(12);
      setPv(20);
      setPmA(6);
      setPm(10);
      setMunA(10);
      setMoney(100);

      setFighting(false);
      setTired(false);
      setHurted(false);
      setUnconscious(false);
      setDying(false);
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
        <button onClick={() => setFighting(!fighting)}>combate</button>

        <button onClick={() => setTired(!tired)}>cansado</button>

        <button onClick={() => setHurted(!hurted)}>machucado</button>

        <button onClick={() => setUnconscious(!unconscious)}>
          inconsciente
        </button>

        <button onClick={() => setDying(!dying)}>morrendo</button>

        <button
          onClick={() => {
            setMunA(munA - 1);
            setShowMun(true);

            setTimeout(() => {
              setShowMun(false);
            }, 5000);
          }}
        >
          - mun
        </button>

        <button
          onClick={() => {
            setMoney(money - 10);
            setShowMoney(true);

            setTimeout(() => {
              setShowMoney(false);
            }, 5000);
          }}
        >
          - money
        </button>
      </div>

      <div className='w-full h-full flex justify-start items-center p-20'>
        <div className='relative'>
          <Hurted hurted={hurted} unconscious={unconscious} />
          <Dying dying={dying} unconscious={unconscious} />
          <div
            style={{
              top: `${imageSize + 30}px`,
              left: `${imageSize}px`,
            }}
            className='fixed z-40 flex flex-col gap-2 justify-center items-start'
          >
            <Money money={money} showMoney={showMoney} />
            <Munition munition={munA} showMun={showMun} />
          </div>
          <PortraitImage
            portrait={portrait}
            unconscious={unconscious}
            tired={tired}
          />
        </div>
        <NameOrStatus
          name={name}
          fighting={fighting}
          pm={pm}
          pmA={pmA}
          pv={pv}
          pvA={pvA}
        />
      </div>
    </>
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
      className={`ml-3 z-40 flex items-center justify-center transition duration-1000 ease-in-out  ${showMun ? 'opacity-100' : 'opacity-0'}`}
    >
      <img width={17} src='/munition.png' />
      <span
        style={{
          textShadow: '0 0 5px #1ee176, 0 0 7px #1ee176',
        }}
        className={`text-5xl mt-4 ml-3 font-bold text-white transition duration-1000 ease-in-out ${specialElite.className} ${showMun ? 'opacity-100' : 'opacity-0'}`}
      >
        {munition}
      </span>
    </div>
  );
}

function Money({ money, showMoney }: { money: number; showMoney: boolean }) {
  return (
    <div
      className={`z-40 flex items-center justify-center transition duration-1000 ease-in-out  ${showMoney ? 'opacity-100' : 'opacity-0'}`}
    >
      <img width={50} height={50} src='/coin.png' />
      <span
        style={{
          textShadow: '0 0 5px #d5c113, 0 0 7px #d5c113',
        }}
        className={`text-5xl mt-2 font-bold text-white transition duration-1000 ease-in-out ${specialElite.className} ${showMoney ? 'opacity-100' : 'opacity-0'}`}
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
        width: imageSize - 50,
        height: imageSize - 50,
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
        width: imageSize + 50,
        height: imageSize + 50,
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
          width: imageSize,
          height: imageSize,
        }}
        className={`absolute left-6 top-6 aspect-square object-cover rounded-full transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0  animate-breathing'} ${tired ? 'grayscale' : ''}`}
        src={portrait || '/noportrait.png'}
      />
      <img
        src={'/moldure.png'}
        style={{
          minWidth: imageSize + 50,
          minHeight: imageSize + 50,
          maxWidth: imageSize + 50,
          maxHeight: imageSize + 50,
        }}
        className='relative z-10'
      ></img>
    </>
  );
}

function NameOrStatus({
  name,
  fighting,
  pvA,
  pv,
  pmA,
  pm,
}: {
  name: string;
  fighting: boolean;
  pvA: number;
  pv: number;
  pmA: number;
  pm: number;
}) {
  const splitedName = name.split(' ');

  const firstName = splitedName[0];
  const lastName = splitedName[1];

  return (
    <>
      <div
        className={`flex flex-col ml-12 mt-6 mb-6 ${!fighting ? 'opacity-100' : 'opacity-0'} transition ${!fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <p
          style={{
            textShadow: '0 0 1rem #7be4ef, 0 0 1rem #7be4ef',
          }}
          className={`text-9xl italic rotate-3 ${imFellEnglish.className}`}
        >
          {firstName}
        </p>
        <p
          style={{
            textShadow: '0 0 1rem #7be4ef, 0 0 1rem #7be4ef',
          }}
          className={`text-9xl italic rotate-3 ${imFellEnglish.className}`}
        >
          {lastName}
        </p>
      </div>

      <div
        className={`relative -left-96 flex flex-col ml-12 mt-8 ${fighting ? 'opacity-100' : 'opacity-0'} transition ${fighting ? 'duration-1000' : 'duration-500'} ease-in-out`}
      >
        <span
          style={{
            textShadow: '0 0 1rem #951818, 0 0 1rem #951818',
          }}
          className={`text-9xl italic text-red-500 rotate-6 shadow-white ${specialElite.className}`}
        >
          {pvA}/{pv}
        </span>
        <span
          style={{
            textShadow: '0 0 1rem #2828c9, 0 0 1rem #2828c9',
          }}
          className={`text-9xl italic text-blue-500 rotate-6 ${specialElite.className}`}
        >
          {pmA}/{pm}
        </span>
      </div>
    </>
  );
}

'use client';

import { useAuth } from '@/app/context/AuthContext';
import AddButton from '@/components/AddButton';
import DeleteButton from '@/components/DeleteButton';
import InventoryContainer from '@/components/InventarioContainer';
import ModalInvite from '@/components/modals/ModalInvite';
import { specialElite } from '@/config/fonts';
import { SessionCharactersInterface } from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { convertMoney } from '@/utils/convertMoney';
import { xpToLevel } from '@/utils/xp-level';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Progress,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiCoin, BiLinkExternal, BiUnlink, BiUserCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default function Session() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = useState<SessionCharactersInterface[]>(
    []
  );
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const response = await api.get(`/sessions/${id}`);

      // if (response.data.userId !== user.id) {
      //   router.push('/');
      // }

      setCharacters([
        {
          id: 1,
          isPublic: true,
          userId: 1,
          name: 'Naksu Hanna',
          age: 20,
          class: 'Arcanista',
          divinity: 'Aisha',
          race: 'Humano',
          xp: 10,
          to: 1,
          ts: 100,
          tp: 10,
          portrait:
            'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
          pv: 100,
          pvA: 70,
          pm: 50,
          pmA: 40,
          munA: 30,
          mun: 30,
          cd: 10,
          defense: 10,
        },
      ]);

      setInventory([
        {
          id: 1,
          name: 'Espada Longa',
          image:
            'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
          characterId: 1,
        },
      ]);
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

  return loading ? (
    <Spinner size='lg' className='mt-6' />
  ) : (
    <>
      <div className='flex flex-col p-4 gap-4 overflow-y-auto overflow-x-hidden'>
        <CharacterContainer
          characters={characters}
          setCharacters={setCharacters}
        />
        <InventoryContainer
          charactersOfSession={characters.map((each) => ({
            value: each.id,
            name: each.name,
          }))}
          inventory={inventory}
          setInventory={setInventory}
        />
      </div>
    </>
  );
}

function CharacterContainer({
  characters,
  setCharacters,
}: {
  characters: SessionCharactersInterface[];
  setCharacters: React.Dispatch<
    React.SetStateAction<SessionCharactersInterface[]>
  >;
}) {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalInvite
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <div className='flex justify-between'>
        <h1 className='text-xl'>Personagens</h1>
        <AddButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          setCharacters={setCharacters}
        />
      ))}
    </div>
  );
}

function CharacterCard({
  character,
  setCharacters,
}: {
  character: SessionCharactersInterface;
  setCharacters: React.Dispatch<
    React.SetStateAction<SessionCharactersInterface[]>
  >;
}) {
  const {
    age,
    cd,
    class: characterClass,
    defense,
    divinity,
    id,
    isPublic,
    mun,
    munA,
    name,
    pm,
    pmA,
    portrait,
    pv,
    pvA,
    race,
    to,
    tp,
    ts,
    xp,
  } = character;

  const router = useRouter();

  const [section, setSection] = useState<'details' | 'status'>('details');
  const xpRef = useRef<HTMLDivElement>(null);

  async function handleChangeVisibility() {
    try {
      //ToDo: Implementar chamada a API

      //await api.put(`/characters/${character.id}`, {
      //  isPublic: !character.isPublic,
      //});

      setCharacters((characters) =>
        characters.map((char) =>
          char.id === character.id
            ? { ...char, isPublic: !char.isPublic }
            : char
        )
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao alterar visibilidade');
    }
  }

  async function handleUnlink() {
    try {
      //ToDo: Implementar chamada a API

      // await api.put(`/characters/${id}`, {
      //   sessionId: null,
      // });

      toast.success('Personagem desvinculado com sucesso');

      setCharacters((prev) => prev.filter((each) => each.id !== id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao desvincular personagem');
    }
  }

  const buttonDetailsActive = section == 'details' ? 'secondary' : 'default';
  const buttonStatusActive = section == 'status' ? 'secondary' : 'default';

  return (
    <Card className='bg-transparent border-2 border-gray-300 rounded-sm'>
      <CardHeader className='justify-between items-center'>
        <div className='flex gap-2'>
          <h1 className='text-lg'>{name}</h1>
          <Button
            as={Link}
            href={`/character/${id}`}
            size='sm'
            variant='light'
            className='text-blue-500 min-w-1'
          >
            <BiLinkExternal size={18} />
          </Button>
        </div>

        <div className='flex gap-2'>
          <Button
            as={Link}
            href={`/character/${id}/portrait`}
            size='sm'
            variant='light'
            className='text-cyan-500 min-w-1'
          >
            <BiUserCircle size={20} />
          </Button>
          <Button
            size='sm'
            className={`min-w-1 ${isPublic ? 'text-green-500' : 'text-danger'}`}
            variant='light'
            onPress={handleChangeVisibility}
          >
            {isPublic ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </Button>
          <DeleteButton onPress={handleUnlink}>
            <BiUnlink className='text-danger' size={19} />
          </DeleteButton>
        </div>
      </CardHeader>
      <Divider className='h-0.5 bg-gray-300' />
      <CardHeader className='justify-center items-center gap-3'>
        <Button
          color={buttonDetailsActive}
          onPress={() => setSection('details')}
        >
          Detalhes
        </Button>
        <Button color={buttonStatusActive} onPress={() => setSection('status')}>
          Status
        </Button>
      </CardHeader>
      <Divider className='h-0.5 bg-gray-300' />
      {section == 'details' && (
        <CardBody className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Input
            variant='bordered'
            size='md'
            disabled
            label='Nome'
            value={name}
          />
          <Input
            variant='bordered'
            size='md'
            disabled
            label='Level'
            value={xpToLevel(xp).toString()}
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
            label='Idade'
            value={age.toString()}
          />
          <Input
            variant='bordered'
            size='md'
            disabled
            label='Classe'
            value={characterClass}
          />
          <Input
            variant='bordered'
            size='md'
            disabled
            label='Raça'
            value={race}
          />
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

          <div className='flex flex-wrap justify-center items-center col-span-full mt-3 px-3 gap-3'>
            {defense && <Chip>{`Defesa (CA): ${defense}`}</Chip>}
            {cd && <Chip>{`Classe de Dificuldade (CD): ${cd}`}</Chip>}

            <div className='flex justify-center items-center gap-1'>
              <img src='/coin.png' width={25} height={25} />
              <span className={`text-xl mt-1 ${specialElite.className}`}>
                {convertMoney(character)}
              </span>
            </div>
          </div>
        </CardBody>
      )}

      {section == 'status' && (
        <CardBody className='gap-4'>
          <div className='w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
            <div
              className={`flex flex-row sm:flex-col items-center gap-4 ${specialElite.className}`}
            >
              <div
                onClick={() => router.push(`/character/${id}/portrait`)}
                className='relative w-32 h-32 rounded-full cursor-pointer overflow-hidden'
              >
                <Image
                  radius='full'
                  className='w-full h-full z-20 rounded-full object-cover'
                  src={portrait || '/noportrait.png'}
                />
                <div
                  ref={xpRef}
                  className='absolute z-30 inset-0 rounded-full'
                  style={{
                    background:
                      'conic-gradient(#43ff5c 0deg, white 0deg 360deg)',
                    maskImage:
                      'radial-gradient(closest-side, transparent 95%, black 0%)',
                    WebkitMaskImage:
                      'radial-gradient(closest-side, transparent 95%, black 0%)',
                  }}
                ></div>

                {/* <div className='absolute z-20 inset-0 rounded-full border-2 border-white'></div> */}
              </div>
              <div className='flex flex-col gap-2'>
                <Chip className='text-center min-w-full pt-1'>
                  Nível {xpToLevel(xp)}
                </Chip>
                <Chip className='text-center min-w-full pt-1'>{xp} XP</Chip>
              </div>
            </div>
            <div className='w-full sm:w-[calc(100%-128px)] flex flex-col mt-1 gap-4'>
              <Progress
                className={specialElite.className}
                label={`Vida: ${pvA}/${pv}`}
                classNames={{
                  indicator: 'bg-red-700',
                }}
                maxValue={pv}
                value={pvA}
              />

              <Progress
                className={specialElite.className}
                label={`Mana: ${pmA}/${pm}`}
                classNames={{
                  indicator: 'bg-blue-700',
                }}
                maxValue={pm}
                value={pmA}
              />

              {mun && (
                <div className='flex items-center gap-3 ml-1'>
                  <img src='/munition.png' width={10} height={10} />
                  <span className={`text-md mt-1 ${specialElite.className}`}>
                    {munA}/{mun}
                  </span>
                </div>
              )}
              <div className='flex items-center gap-1'>
                <img src='/coin.png' width={25} height={25} />
                <span className={`text-md mt-1 ${specialElite.className}`}>
                  {convertMoney(character)}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

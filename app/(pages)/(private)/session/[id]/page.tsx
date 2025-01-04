'use client';

import { useSocket } from '@/app/context/SocketContext';
import AddButton from '@/components/AddButton';
import DiceContainer from '@/components/DiceContainer';
import InventoryContainer from '@/components/InventoryContainer';
import ModalInvite from '@/components/modals/ModalInvite';
import RollsContainer from '@/components/RollsContainer';
import { SessionCharacterCard } from '@/components/SessionCharacterCard';
import { SoundContainer } from '@/components/SoundContainer';
import { api } from '@/providers/api';
import { SessionCharactersInterface } from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { Button, Divider, Spinner, useDisclosure } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiShardSword } from 'react-icons/gi';
import { toast } from 'react-toastify';

export default function Session() {
  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = useState<SessionCharactersInterface[]>(
    []
  );
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);

  const { id } = useParams();

  const router = useRouter();

  const { onItem, itemOff } = useSocket();

  async function fetchData() {
    try {
      const { data } = await api.get(`/sessions/${id}`);

      window.document.title = `${data.name} - ONDA RPG`;

      setCharacters(data.characters);

      setInventory(data.items);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.data.message.includes('permissão')) {
        router.push('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateInventory(senderName: string) {
    try {
      const response = await api.get(`/items/session/${id}`);

      setInventory(response.data);

      toast.success(`Você recebeu um item de ${senderName}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();

    onItem(true, Number(id), (data) => {
      updateInventory(data.senderName);
    });

    return () => {
      itemOff(true, Number(id));
    };
  }, []);

  return loading ? (
    <Spinner size='lg' color='current' className='mt-6' />
  ) : (
    <>
      <div className='flex flex-col p-4 gap-4 overflow-y-auto overflow-x-hidden'>
        <SoundContainer
          userIds={characters.map((character) => character.userId)}
        />
        <CharacterContainer
          characters={characters}
          setCharacters={setCharacters}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <DiceContainer
            name='Mestre'
            portrait={null}
            sessionId={Number(id)}
            characterId={null}
          />
          <RollsContainer sessionId={Number(id)} />
        </div>
        <InventoryContainer
          senderName='Mestre'
          sessionId={Number(id)}
          charactersOfSession={characters.map((each) => ({
            value: each.id,
            name: each.mainCharacter.name,
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

  const { emitStatusCharacter } = useSocket();

  const [fighting, setFighting] = useState(false);

  function handleFighting(value: boolean) {
    characters.forEach((character) => {
      emitStatusCharacter(
        {
          characterId: character.id,
          key: 'fighting',
          value,
        },
        () => {
          setFighting(value);
        }
      );
    });
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalInvite
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <div className='flex justify-between items-center'>
        <Button
          size='sm'
          variant='light'
          className={`${fighting ? 'text-green-500' : 'text-danger'} min-w-1`}
          onPress={() => handleFighting(!fighting)}
        >
          <GiShardSword size={20} />
        </Button>
        <h1 className='text-xl'>Personagens</h1>
        <AddButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {characters.map((character) => (
          <SessionCharacterCard
            key={character.id}
            initialCharacter={character}
            setCharacters={setCharacters}
          />
        ))}
      </div>
    </div>
  );
}

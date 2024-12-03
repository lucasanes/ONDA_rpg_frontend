'use client';

import AddButton from '@/components/AddButton';
import InventoryContainer from '@/components/InventarioContainer';
import ModalInvite from '@/components/modals/ModalInvite';
import { SessionCharacterCard } from '@/components/SessionCharacterCard';
import { api } from '@/providers/api';
import { SessionCharactersInterface } from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { Divider, Spinner, useDisclosure } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Session() {
  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = useState<SessionCharactersInterface[]>(
    []
  );
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);

  const { id } = useParams();

  async function fetchData() {
    try {
      const { data } = await api.get(`/sessions/${id}`);

      window.document.title = `${data.name} - ONDA RPG`;

      setCharacters(data.characters);

      setInventory(data.items);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
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
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {characters.map((character) => (
          <SessionCharacterCard
            key={character.id}
            character={character}
            setCharacters={setCharacters}
          />
        ))}
      </div>
    </div>
  );
}

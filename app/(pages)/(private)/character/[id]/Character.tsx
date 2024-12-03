'use client';

import { useDisabled } from '@/app/context/DisabledContext';
import InventoryContainer from '@/components/InventarioContainer';
import { MainContainer } from '@/components/MainContainer';
import { StatusContainer } from '@/components/StatusContainer';
import { api } from '@/providers/api';
import {
  CharacterInterface,
  MainCharacterInterface,
  StatusCharacterInterface,
} from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { Spinner } from '@nextui-org/react';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Character() {
  const [loading, setLoading] = useState(true);

  const [charactersOfSession, setCharactersOfSession] = useState<
    { value: string | number; name: string }[]
  >([]);

  const [character, setCharacter] = useState<CharacterInterface>(
    {} as CharacterInterface
  );
  const [initialMainCharacter, setInitialMainCharacter] =
    useState<MainCharacterInterface>({} as MainCharacterInterface);
  const [initialStatusCharacter, setInitialStatusCharacter] =
    useState<StatusCharacterInterface>({} as StatusCharacterInterface);
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);

  const { id } = useParams();
  const { setDisabled } = useDisabled();

  async function fetchData() {
    try {
      const response = await api.get(`/characters/${id}`);

      const character = response.data.character;

      if (!response.data.hasPermission) {
        if (character.isPublic) {
          setDisabled(false);
        } else {
          redirect('/dashboard');
        }
      }

      setCharactersOfSession(
        character.session.characters.map(
          (char: { id: number; mainCharacter: { name: string } }) => ({
            value: char.id,
            name: char.mainCharacter.name,
          })
        )
      );

      setCharacter({
        id: character.id,
        isPublic: character.isPublic,
        sessionId: character.sessionId,
        userId: character.userId,
      });

      setInitialMainCharacter({
        ...character.mainCharacter,
      });

      setInitialStatusCharacter({
        ...character.statusCharacter,
        dying: false,
        fighting: false,
        hurted: false,
        tired: false,
        unconscious: false,
      });

      setInventory(character.items);
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <MainContainer initialMainCharacter={initialMainCharacter} />
          <StatusContainer
            id={character.id}
            initialStatusCharacter={initialStatusCharacter}
          />
        </div>
        <div>
          <InventoryContainer
            charactersOfSession={charactersOfSession}
            inventory={inventory}
            setInventory={setInventory}
          />
        </div>
      </div>
    </>
  );
}

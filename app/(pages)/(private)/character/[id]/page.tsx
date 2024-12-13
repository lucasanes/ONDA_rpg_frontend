'use client';

import { useDisabled } from '@/app/context/DisabledContext';
import { useSocket } from '@/app/context/SocketContext';
import DiceContainer from '@/components/DiceContainer';
import InventoryContainer from '@/components/InventoryContainer';
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
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Select = {
  value: number;
  name: string;
};

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
  const { onItem, itemOff } = useSocket();

  const router = useRouter();

  async function fetchData() {
    try {
      const response = await api.get(`/characters/${id}`);

      const character = response.data.character;

      if (!response.data.hasPermission) {
        if (character.isPublic) {
          setDisabled(true);
        } else {
          router.push('/dashboard');
          return;
        }
      }

      window.document.title = `${character.mainCharacter.name} - ONDA RPG`;

      if (character.sessionId) {
        const charactersOfSession: Select[] = character.session.characters
          .filter((char: { id: number }) => char.id !== character.id)
          .map((char: { id: number; mainCharacter: { name: string } }) => ({
            value: char.id,
            name: char.mainCharacter.name,
          }));

        setCharactersOfSession([
          {
            value: `sessionId:${character.sessionId}`,
            name: 'Mestre',
          },
          ...charactersOfSession.sort((a: Select, b: Select) =>
            a.name.localeCompare(b.name)
          ),
        ]);
      }
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
        xp: character.mainCharacter.xp,
        dying: false,
        fighting: false,
        hurted: false,
        tired: false,
        unconscious: false,
      });

      setInventory(character.items);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);

      if (error.response.data.message.includes('permissão')) {
        router.push('/dashboard');
      }
    }
  }

  async function updateInventory(senderName: string) {
    try {
      const response = await api.get(`/items/character/${id}`);

      setInventory(response.data);

      toast.success(`Você recebeu um item de ${senderName}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();

    onItem(false, Number(id), (data) => {
      updateInventory(data.senderName);
    });

    return () => {
      itemOff(false, Number(id));
    };
  }, []);

  return loading ? (
    <Spinner size='lg' color='current' className='mt-6' />
  ) : (
    <>
      <div className='flex flex-col p-4 gap-4 overflow-y-auto overflow-x-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <MainContainer
            userId={character.userId}
            initialMainCharacter={initialMainCharacter}
          />
          <StatusContainer
            id={character.id}
            initialStatusCharacter={initialStatusCharacter}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <DiceContainer
            name={initialMainCharacter.name}
            portrait={initialStatusCharacter.portrait}
            characterId={character.id}
            sessionId={character.sessionId ? character.sessionId : null}
          />
        </div>
        <div>
          <InventoryContainer
            senderName={initialMainCharacter.name}
            sessionId={character.sessionId ? character.sessionId : null}
            charactersOfSession={charactersOfSession}
            weightLimit={initialMainCharacter.weightLimit}
            inventory={inventory}
            setInventory={setInventory}
          />
        </div>
      </div>
    </>
  );
}

'use client';

import { useAuth } from '@/app/context/AuthContext';
import EditButton from '@/components/EditButton';
import InventoryContainer from '@/components/InventarioContainer';
import { SessionCharactersInterface } from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { Divider, Spinner, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
          level: 1,
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
          {/* <MainContainer
            mainCharacter={mainCharacter}
            setMainCharacter={setMainCharacter}
          /> */}
        </div>
        <div>
          <InventoryContainer
            charactersOfSession={characters.map((each) => ({
              id: each.id,
              name: each.name,
            }))}
            inventory={inventory}
            setInventory={setInventory}
          />
        </div>
      </div>
    </>
  );
}

function MainContainer({
  characters,
}: {
  characters: SessionCharactersInterface[];
}) {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      {/* <ModalEditMain
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        mainCharacter={mainCharacter}
        setMainCharacter={setMainCharacter}
      /> */}
      <div className='flex justify-between'>
        <h1 className='text-xl'>Principal</h1>
        <EditButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <h1>Teste</h1>
    </div>
  );
}

'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useDisabled } from '@/app/context/DisabledContext';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import ModalAddItem from '@/components/modals/ModalAddItem';
import ModalEditItem from '@/components/modals/ModalEditItem';
import ModalEditMain from '@/components/modals/ModalEditMain';
import ModalEditStatus from '@/components/modals/ModalEditStatus';
import ModalImage from '@/components/modals/ModalImage';
import StatusBar from '@/components/StatusBar';
import { specialElite } from '@/config/fonts';
import {
  CharacterInterface,
  MainCharacterInterface,
  StatusCharacterInterface,
} from '@/types/character';
import { InventoryInterface } from '@/types/inventory';
import { convertMoney } from '@/utils/convertMoney';
import { Input } from '@nextui-org/input';
import {
  Button,
  Divider,
  Image,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BiCoin } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function Character() {
  const router = useRouter();
  const { user } = useAuth();
  const { disabled, setDisabled } = useDisabled();

  const [loading, setLoading] = useState(true);

  const [character, setCharacter] = useState<CharacterInterface>(
    {} as CharacterInterface
  );
  const [mainCharacter, setMainCharacter] = useState<MainCharacterInterface>(
    {} as MainCharacterInterface
  );
  const [statusCharacter, setStatusCharacter] =
    useState<StatusCharacterInterface>({} as StatusCharacterInterface);
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const response = await api.get(`/characters/${id}`);

      // if (response.data.userId !== user.id) {
      //   const sessionsOfUser = await api.get(`/sessions/user/${user.id}`);
      //   if (!sessionOfUser.data.find((session) => session.id === response.data.sessionId)) {
      //     if (response.data.isPublic) {
      //       setDisabled(true)
      //     } else {
      //       router.push('/');
      //     }
      //   }
      // }

      setCharacter({
        id: 1,
        isPublic: true,
        sessionId: 1,
        userId: 1,
      });

      setMainCharacter({
        name: 'Naksu Hanna',
        class: 'Arcanista',
        divinity: 'Aisha',
        level: 1,
        race: 'Humano',
        xp: 10,
        to: 1,
        ts: 100,
        tp: 10,
      });

      setStatusCharacter({
        portrait:
          'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
        pv: 100,
        pvA: 70,
        pm: 50,
        pmA: 40,
        munA: 30,
        mun: 30,
        dying: false,
        fighting: false,
        hurted: false,
        tired: false,
        unconscious: false,
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
  }, []);

  function updateCharacterField<T extends keyof StatusCharacterInterface>(
    field: T,
    value: StatusCharacterInterface[T]
  ) {
    setStatusCharacter((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return loading ? (
    <Spinner size='lg' className='mt-6' />
  ) : (
    <>
      <div className='flex flex-col p-4 gap-4 overflow-y-auto overflow-x-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <MainContainer
            mainCharacter={mainCharacter}
            setMainCharacter={setMainCharacter}
          />
          <StatusContainer
            id={character.id}
            statusCharacter={statusCharacter}
            setStatusCharacter={setStatusCharacter}
            onUpdate={updateCharacterField}
          />
        </div>
        <div>
          <InventoryContainer
            inventory={inventory}
            setInventory={setInventory}
          />
        </div>
      </div>
    </>
  );
}

function MainContainer({
  mainCharacter,
  setMainCharacter,
}: {
  mainCharacter: MainCharacterInterface;
  setMainCharacter: Dispatch<SetStateAction<MainCharacterInterface>>;
}) {
  const { name, level, xp, divinity, race, ts, to, tp } = mainCharacter;

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalEditMain
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        mainCharacter={mainCharacter}
        setMainCharacter={setMainCharacter}
      />
      <div className='flex justify-between'>
        <h1 className='text-xl'>Principal</h1>
        <EditButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <Input variant='bordered' size='md' disabled label='Nome' value={name} />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Level'
        value={level.toString()}
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
        label='Classe'
        value={mainCharacter.class}
      />
      <Input variant='bordered' size='md' disabled label='Raça' value={race} />
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

      <div className='flex items-center gap-1'>
        <img src='/coin.png' width={25} height={25} />
        <span className={`text-xl mt-1 ${specialElite.className}`}>
          {convertMoney(mainCharacter)}
        </span>
      </div>
    </div>
  );
}

function StatusContainer({
  id,
  statusCharacter,
  onUpdate,
  setStatusCharacter,
}: {
  id: number;
  statusCharacter: StatusCharacterInterface;
  onUpdate: (field: keyof StatusCharacterInterface, value: any) => void;
  setStatusCharacter: Dispatch<SetStateAction<StatusCharacterInterface>>;
}) {
  const {
    pv,
    pvA,
    pm,
    pmA,
    mun,
    munA,
    portrait,
    dying,
    fighting,
    unconscious,
    tired,
    hurted,
  } = statusCharacter;

  const router = useRouter();
  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  function handleFighting() {
    //ToDo: Implementar chamada Socket

    onUpdate('fighting', !fighting);
  }

  function handleTired() {
    //ToDo: Implementar chamada Socket

    onUpdate('tired', !tired);
  }

  function handleHurted() {
    //ToDo: Implementar chamada Socket

    onUpdate('hurted', !hurted);
  }

  function handleDying() {
    //ToDo: Implementar chamada Socket

    onUpdate('dying', !dying);
  }

  function handleUnconscious() {
    //ToDo: Implementar chamada Socket

    onUpdate('unconscious', !unconscious);
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalEditStatus
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        statusCharacter={statusCharacter}
        setStatusCharacter={setStatusCharacter}
      />
      <div className='flex justify-between'>
        <h1 className='text-xl'>Status</h1>
        <EditButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <div className='flex flex-col-reverse xl:flex-row gap-10 justify-evenly items-center'>
        <div className='border-2 border-gray-400 rounded-md flex flex-col items-center'>
          <h1 className='my-1 text-lg text-center'>Status</h1>
          <Divider />
          <div className='min-w-60 flex flex-col gap-4 p-4'>
            <Button
              className={`border-2 border-fighting text-gray-200 ${fighting ? 'bg-fighting-50' : 'bg-transparent'}`}
              onPress={handleFighting}
              isDisabled={disabled}
            >
              Combate
            </Button>
            <Button
              className={`border-2 border-tired text-gray-200 ${tired ? 'bg-tired-50' : 'bg-transparent'}`}
              onPress={handleTired}
              isDisabled={disabled}
            >
              Cansado
            </Button>
            <Button
              className={`border-2 border-hurted text-gray-200 ${hurted ? 'bg-hurted-50' : 'bg-transparent'}`}
              onPress={handleHurted}
              isDisabled={disabled}
            >
              Ferimento Médio
            </Button>
            <Button
              className={`border-2 border-dying text-gray-200 ${dying ? 'bg-dying-50' : 'bg-transparent'}`}
              onPress={handleDying}
              isDisabled={disabled}
            >
              Ferimento Grave
            </Button>
            <Button
              className={`border-2 border-unconscious text-gray-200 ${unconscious ? 'bg-unconscious-50' : 'bg-transparent'}`}
              onPress={handleUnconscious}
              isDisabled={disabled}
            >
              Inconsciente
            </Button>
          </div>
        </div>
        <div
          onClick={() => router.push(`/character/${id}/portrait`)}
          className='relative min-w-64 min-h-64 max-w-64 max-h-64 rounded-full cursor-pointer'
        >
          <div className='z-10 absolute min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover border-2'></div>
          <img
            style={{
              width: 350,
              height: 350,
            }}
            src='/blood2.png'
            className={`absolute z-20 -bottom-12 rounded-full rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-90' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
          />
          <img
            style={{
              width: 250,
              height: 250,
            }}
            src='/blood1.png'
            className={`absolute z-20 left-2 bottom-3 rounded-full rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-80' : `opacity-0`} ${unconscious ? 'blur-sm' : ''}`}
          />
          <img
            className={`z-0 min-w-64 min-h-64 max-w-64 max-h-64 rounded-full aspect-square object-cover transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'} ${tired ? 'grayscale' : ''}`}
            src={portrait || '/noportrait.png'}
          />
        </div>
      </div>

      <span className='mt-3 text-center'>Vida</span>

      <StatusBar
        title='Vida'
        currentValue={pvA}
        maxValue={pv}
        onCurrentValueUpdate={(value) => onUpdate('pvA', value)}
        onMaxValueUpdate={(value) => onUpdate('pv', value)}
        color='bg-red-700'
      />

      <span className='mt-3 text-center'>Mana</span>

      <StatusBar
        title='Mana'
        currentValue={pmA}
        maxValue={pm}
        onCurrentValueUpdate={(value) => onUpdate('pmA', value)}
        onMaxValueUpdate={(value) => onUpdate('pm', value)}
        color='bg-blue-700'
      />

      {mun && (
        <>
          <span className='mt-3 text-center'>Munição</span>

          <StatusBar
            title='Munição'
            currentValue={munA}
            maxValue={mun}
            onCurrentValueUpdate={(value) => onUpdate('munA', value)}
            onMaxValueUpdate={(value) => onUpdate('mun', value)}
            color='bg-green-400'
          />
        </>
      )}
    </div>
  );
}

function InventoryContainer({
  inventory,
  setInventory,
}: {
  inventory: InventoryInterface[];
  setInventory: Dispatch<SetStateAction<InventoryInterface[]>>;
}) {
  const router = useRouter();
  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  function handleClean() {
    //ToDO: Implementar Socket
  }

  function Item({ item }: { item: InventoryInterface }) {
    const {
      onOpen: onImageModalOpen,
      isOpen: isImageModalOpen,
      onClose: onImageModalClose,
      onOpenChange: onImageModalOpenChange,
    } = useDisclosure();

    const {
      onOpen: onEditModalOpen,
      isOpen: isEditModalOpen,
      onClose: onEditModalClose,
      onOpenChange: onEditModalOpenChange,
    } = useDisclosure();

    function handleSend() {
      //ToDO: Implementar Socket

      onImageModalOpen();
    }

    function handleDelete() {
      //ToDo: Implementar chamada a API

      //api.delete(`/inventory/${item.id}`);

      setInventory((prev) => prev.filter((each) => each.id !== item.id));

      onEditModalClose();
    }

    return (
      <div className='min-w-64 max-w-lg flex flex-col justify-center items-center border-2 border-gray-300 rounded-sm'>
        <ModalImage
          isOpen={isImageModalOpen}
          onClose={onImageModalClose}
          onOpenChange={onImageModalOpenChange}
          image={item.image}
        />
        <ModalEditItem
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          onOpenChange={onEditModalOpenChange}
          item={item}
          setInventory={setInventory}
          handleDelete={handleDelete}
        />
        <div className='w-full flex px-2 justify-between items-center'>
          <Button
            className='min-w-1 text-cyan-400'
            variant='light'
            size='sm'
            isDisabled={disabled}
            onPress={handleSend}
          >
            <RiShareForwardLine size={21} />
          </Button>
          <span className='m-2 text-center break-words whitespace-break-spaces capitalize'>
            {item.name}
          </span>
          <EditButton onPress={onEditModalOpen} size={16} />
        </div>
        <Divider className='h-0.5 bg-gray-300' />
        <div className='m-5 rounded-sm'>
          <Image
            onClick={onImageModalOpen}
            isZoomed
            src={item.image}
            className='aspect-square object-cover cursor-pointer'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalAddItem
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setInventory={setInventory}
      />
      <div className='flex justify-between'>
        <Button
          className='min-w-1 text-cyan-400'
          variant='light'
          size='sm'
          isDisabled={disabled}
          onPress={handleClean}
        >
          <AiOutlineClear size={21} />
        </Button>
        <h1 className='text-xl'>Inventário</h1>
        <AddButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />
      <div className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4'>
        {inventory.map((item) => (
          <Item item={item} />
        ))}
      </div>
    </div>
  );
}

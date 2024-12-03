import { useDisabled } from '@/app/context/DisabledContext';
import { InventoryInterface } from '@/types/inventory';
import {
  Button,
  Divider,
  Image,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineClear, AiOutlineSend } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import AddButton from './AddButton';
import EditButton from './EditButton';
import ModalAddItem from './modals/ModalAddItem';
import ModalEditItem from './modals/ModalEditItem';
import ModalImage from './modals/ModalImage';

export default function InventoryContainer({
  charactersOfSession,
  inventory,
  setInventory,
}: {
  charactersOfSession: { value: string | number; name: string }[];
  inventory: InventoryInterface[];
  setInventory: Dispatch<SetStateAction<InventoryInterface[]>>;
}) {
  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const [characterSelected, setCharacterSelected] = useState<string | number>(
    ''
  );
  const [itemSelected, setItemSelected] = useState<number>(0);

  const showSender = inventory.length > 0 && charactersOfSession.length > 0;

  function handleClean() {
    //ToDO: Implementar Socket
  }

  function handleSend() {
    try {
      if (!itemSelected || !characterSelected) {
        toast.error('Selecione um item e um personagem');
        return;
      }

      //ToDO: Implementar Socket

      //ToDo: Implementar chamada a API

      // if (characterSelected.value === 'Mestre') {
      //   api.put(`/inventory/${itemSelected}/send`);
      // } else {
      //   api.put(`/inventory/${itemSelected}/send/${characterSelected}`);
      // }

      setInventory((prev) => prev.filter((each) => each.id !== itemSelected));

      toast.success(
        `Item enviado com sucesso para ${
          charactersOfSession.find(
            (character) => character.value === characterSelected
          )?.name
        }`
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao enviar item');
    }
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
      {inventory.length > 0 && (
        <>
          <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

          <div className='grid grid-cols-1 sm:grid-cols-2 min-[880px]:grid-cols-3 xl:grid-cols-4 gap-4'>
            {inventory.map((item) => (
              <Item
                key={item.id}
                item={item}
                setInventory={setInventory}
                disabled={disabled}
              />
            ))}
          </div>
        </>
      )}
      {showSender && (
        <>
          <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

          <div className='flex items-center justify-center gap-5'>
            <div className='flex flex-col sm:flex-row gap-5'>
              <Select
                isDisabled={disabled}
                className='w-40'
                size='sm'
                label='Item'
                onChange={(e) => setItemSelected(Number(e.target.value))}
              >
                {inventory.map((item) => (
                  <SelectItem key={`${item.id}`}>{item.name}</SelectItem>
                ))}
              </Select>

              <Select
                isDisabled={disabled}
                className='w-40'
                size='sm'
                label='Personagem'
                onChange={(e) => {
                  const value = isNaN(parseInt(e.target.value, 10))
                    ? e.target.value
                    : Number(e.target.value);

                  setCharacterSelected(value);
                }}
              >
                {charactersOfSession.map((character) => (
                  <SelectItem key={character.value}>
                    {character.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Button
              variant='light'
              color='secondary'
              size='md'
              className='min-w-8 text-cyan-400'
              isDisabled={disabled}
              onPress={handleSend}
            >
              <AiOutlineSend size={20} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function Item({
  item,
  setInventory,
  disabled,
}: {
  item: InventoryInterface;
  setInventory: Dispatch<SetStateAction<InventoryInterface[]>>;
  disabled: boolean;
}) {
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
    <div className='min-w-64 flex flex-col justify-center items-center border-2 border-gray-300 rounded-sm'>
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

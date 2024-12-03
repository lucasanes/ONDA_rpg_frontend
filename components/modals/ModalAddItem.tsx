import { api } from '@/providers/api';
import { InventoryInterface } from '@/types/inventory';
import { Button, Input } from '@nextui-org/react';
import { useParams, usePathname } from 'next/navigation';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import FileInput from '../FileInput';
import ModalComponent from './Modal';

export default function ModalAddItem({
  isOpen,
  onClose,
  onOpenChange,
  setInventory,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  setInventory: Dispatch<SetStateAction<InventoryInterface[]>>;
}) {
  const { id } = useParams();
  const pathname = usePathname();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (pathname.includes('character')) {
        const response = await api.post('/items', {
          name,
          image,
          characterId: Number(id),
        });

        setInventory((prev) => [
          ...prev,
          {
            id: response.data.id,
            name,
            characterId: Number(id),
            image,
          },
        ]);
      } else {
        const response = await api.post('/items', {
          name,
          image,
          sessionId: Number(id),
        });

        setInventory((prev) => [
          ...prev,
          {
            ...prev,
            id: response.data.id,
            name,
            sessionId: Number(id),
            image,
          },
        ]);
      }

      toast.success('Item adicionado com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar personagem');
    }
  }

  return (
    <ModalComponent
      title='Adicionar Item'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <>
          <Input
            required
            isRequired
            label={'Nome'}
            labelPlacement='outside'
            placeholder='Espada'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FileInput
            required
            isRequired
            label={'Imagem'}
            placeholder='Selecione uma imagem'
            value={image}
            setValue={setImage}
          />
        </>
      }
      footerContent={
        <>
          <Button onPress={onClose} variant='flat' color='danger'>
            Cancelar
          </Button>
          <Button type='submit' color='primary'>
            Salvar
          </Button>
        </>
      }
    />
  );
}

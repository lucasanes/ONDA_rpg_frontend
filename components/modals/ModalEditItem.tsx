import { api } from '@/providers/api';
import { InventoryInterface } from '@/types/inventory';
import { Button, Input, Spinner, Textarea } from '@nextui-org/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import FileInput from '../FileInput';
import ModalComponent from './Modal';

export default function ModalEditItem({
  isOpen,
  onClose,
  onOpenChange,
  item,
  setInventory,
  handleDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  item: InventoryInterface;
  setInventory: Dispatch<SetStateAction<InventoryInterface[]>>;
  handleDelete: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [weight, setWeight] = useState(item.weight);
  const [image, setImage] = useState(item.image);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isSubmitting) return;

      setIsSubmitting(true);

      await api.put(`/items/${item.id}`, {
        name,
        image,
        description,
        weight,
      });

      setInventory((prev) => {
        const index = prev.findIndex((each) => item.id === each.id);

        prev[index] = {
          ...prev[index],
          name,
          description,
          weight,
          image,
        };

        return [...prev];
      });

      toast.success('Item editado com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar item');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ModalComponent
      title='Editar Item'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
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

          <Input
            required
            isRequired
            type='number'
            label={'Peso'}
            labelPlacement='outside'
            placeholder='1kg'
            value={weight.toString()}
            onChange={(e) => setWeight(Number(e.target.value))}
          />

          <Textarea
            required
            isRequired
            label={'Descrição'}
            labelPlacement='outside'
            placeholder='Uma espada afiada'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FileInput
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
          <Button isDisabled={isSubmitting} type='submit' color='primary'>
            {isSubmitting ? <Spinner size='sm' color='current' /> : 'Salvar'}
          </Button>
        </>
      }
    />
  );
}

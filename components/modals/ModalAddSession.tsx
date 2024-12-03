import { api } from '@/providers/api';
import { SessionInterface } from '@/types/session';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import ModalComponent from './Modal';

export default function ModalAddSession({
  isOpen,
  onClose,
  onOpenChange,
  setSessions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  setSessions: Dispatch<SetStateAction<SessionInterface[]>>;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post('/sessions', { name, description });

      setSessions((prevSessions) => [
        ...prevSessions,
        {
          id: response.data.id,
          name,
          description,
          players: [],
        },
      ]);

      toast.success('Sessão criada com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar sessão');
    }
  }

  return (
    <ModalComponent
      title='Criar Sessão'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <>
          <Input
            isRequired
            required
            label='Nome'
            labelPlacement='outside'
            placeholder='ONDA'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            isRequired
            required
            label='Descrição'
            labelPlacement='outside'
            placeholder='ONDA é um RPG de mesa...'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      }
      footerContent={
        <>
          <Button onPress={onClose} variant='flat' color='danger'>
            Cancelar
          </Button>
          <Button type='submit' color='primary'>
            Adicionar
          </Button>
        </>
      }
    />
  );
}

import { api } from '@/providers/api';
import { SessionInterface } from '@/types/session';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import ModalComponent from './Modal';

export default function ModalEditSession({
  id,
  isOpen,
  onClose,
  onOpenChange,
  session,
  setSessions,
}: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  session: SessionInterface;
  setSessions: Dispatch<SetStateAction<SessionInterface[]>>;
}) {
  const [name, setName] = useState(session.name);
  const [description, setDescription] = useState(session.description);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.put(`/sessions/${id}`, { name, description });

      const updatedSession = {
        ...session,
        name,
        description,
      };

      setSessions((prevSessions) =>
        prevSessions.map((prevSession) =>
          prevSession.id === session.id ? updatedSession : prevSession
        )
      );

      toast.success('Sessão editada com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar sessão');
    }
  }

  return (
    <ModalComponent
      title='Editar Sessão'
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
            Salvar
          </Button>
        </>
      }
    />
  );
}

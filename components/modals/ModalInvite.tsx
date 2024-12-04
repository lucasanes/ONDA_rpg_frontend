import { useAuth } from '@/app/context/AuthContext';
import { useSocket } from '@/app/context/SocketContext';
import { api } from '@/providers/api';
import { Button, Input } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import ModalComponent from './Modal';

export default function ModalInvite({
  isOpen,
  onClose,
  onOpenChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) {
  const [email, setEmail] = useState('');

  const { id } = useParams();

  const { user } = useAuth();
  const { emitInvite } = useSocket();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (email === user?.email) {
        toast.error('Você não pode convidar a si mesmo');
        return;
      }

      const { data } = await api.post('/invites', {
        email,
        sessionId: Number(id),
      });

      emitInvite(data, () => {
        console.log('sent');
        toast.success('Convite enviado com sucesso');
      });

      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <ModalComponent
      title='Enviar Convite'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <>
          <Input
            required
            isRequired
            label={'Email'}
            labelPlacement='outside'
            type='email'
            placeholder='player1@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      }
      footerContent={
        <>
          <Button onPress={onClose} variant='flat' color='danger'>
            Cancelar
          </Button>
          <Button type='submit' color='primary'>
            Enviar
          </Button>
        </>
      }
    />
  );
}

import { Button, Input } from '@nextui-org/react';
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //Todo: Implementar Socket

      //socket.emit('invite', {  });

      //ToDo: Implementar chamada a API

      //const response = await api.post('/invite', {  });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar convite');
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

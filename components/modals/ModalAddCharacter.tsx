import { CharactersInterface } from '@/types/character';
import { Button, Input } from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import FileInput from '../FileInput';
import ModalComponent from './Modal';

export default function ModalAddCharacter({
  isOpen,
  onClose,
  onOpenChange,
  setCharacters,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  setCharacters: React.Dispatch<React.SetStateAction<CharactersInterface[]>>;
}) {
  const [name, setName] = useState('');
  const [pv, setPv] = useState(0);
  const [pm, setPm] = useState(0);
  const [portrait, setPortrait] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //ToDo: Implementar chamada a API

      //const response = await api.post('/characters', {
      //  name,
      //  pv,
      //  pm,
      //  portrait,
      //});

      setCharacters((characters) => [
        ...characters,
        {
          id: Math.random(),
          name,
          pvA: pv,
          pv,
          isPublic: false,
          userId: 1,
          pmA: pm,
          pm,
          level: 1,
          mun: 0,
          munA: 0,
          to: 0,
          tp: 0,
          ts: 0,
          xp: 0,
          portrait,
        },
      ]);

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar personagem');
    }
  }

  return (
    <ModalComponent
      title='Adicionar Sessão'
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

          <Input
            isRequired
            required
            label='PV'
            labelPlacement='outside'
            placeholder='999'
            type='number'
            value={pv.toString()}
            onChange={(e) => setPv(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='PM'
            labelPlacement='outside'
            placeholder='999'
            type='number'
            value={pm.toString()}
            onChange={(e) => setPm(Number(e.target.value))}
          />

          <FileInput
            isRequired
            required
            label='Portrait'
            placeholder='https://site.com/onda.png'
            value={portrait}
            setValue={(value) => setPortrait(value)}
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

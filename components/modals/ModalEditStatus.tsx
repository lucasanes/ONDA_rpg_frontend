import { StatusCharacterInterface } from '@/types/character';
import { Button } from '@nextui-org/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import FileInput from '../FileInput';
import ModalComponent from './Modal';

export default function ModalEditStatus({
  isOpen,
  onClose,
  onOpenChange,
  statusCharacter,
  setStatusCharacter,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  statusCharacter: StatusCharacterInterface;
  setStatusCharacter: Dispatch<SetStateAction<StatusCharacterInterface>>;
}) {
  const [portrait, setPortrait] = useState(statusCharacter.portrait || '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //ToDo: Implementar chamada a API

      //const response = await api.put('/character/${id}/status', { portrait });

      setStatusCharacter((prev) => ({
        ...prev,
        portrait,
      }));

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar personagem');
    }
  }

  return (
    <ModalComponent
      title='Editar Status'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <FileInput
          required
          isRequired
          label={'Portrait'}
          placeholder='Selecione uma imagem'
          value={portrait}
          setValue={setPortrait}
        />
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

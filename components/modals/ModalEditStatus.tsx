import { StatusCharacterInterface } from '@/types/character';
import { Button, Input } from '@nextui-org/react';
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
  const [defense, setDefense] = useState(statusCharacter.defense);
  const [cd, setCd] = useState(statusCharacter.cd);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //ToDo: Implementar chamada a API

      //const response = await api.put('/character/${id}/status', { portrait });

      setStatusCharacter((prev) => ({
        ...prev,
        portrait,
        defense,
        cd,
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
        <>
          <Input
            required
            isRequired
            label={'Defesa (CA)'}
            labelPlacement='outside'
            placeholder='10 + 1/2 LVL + DES + bônus armadura/escudo'
            type='number'
            value={defense.toString()}
            onChange={(e) => setDefense(Number(e.target.value))}
          />

          <Input
            required
            isRequired
            labelPlacement='outside'
            label={'Classe de Dificuldade (CD)'}
            placeholder='10 + 1/2 LVL + atributo chave + bônus resistência'
            type='number'
            value={cd.toString()}
            onChange={(e) => setCd(Number(e.target.value))}
          />

          <FileInput
            required
            isRequired
            label={'Portrait'}
            placeholder='Selecione uma imagem'
            value={portrait}
            setValue={setPortrait}
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

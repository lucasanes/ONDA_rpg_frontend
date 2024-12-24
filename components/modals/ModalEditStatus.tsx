import { api } from '@/providers/api';
import { StatusCharacterInterface } from '@/types/character';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isSubmitting) return;

      setIsSubmitting(true);

      await api.put(`/characters/${id}/status`, {
        portrait: portrait ? portrait : null,
        defense,
        cd,
        moldure: statusCharacter.moldure,
        hp: statusCharacter.hp,
        currentHp: statusCharacter.currentHp,
        mp: statusCharacter.mp,
        currentMp: statusCharacter.currentMp,
        mun: statusCharacter.mun,
        currentMun: statusCharacter.currentMun,
      });

      setStatusCharacter((prev) => ({
        ...prev,
        portrait: portrait ? portrait : null,
        defense,
        cd,
      }));

      toast.success('Personagem editado com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar personagem');
    } finally {
      setIsSubmitting(false);
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
          <Button isDisabled={isSubmitting} type='submit' color='primary'>
            {isSubmitting ? <Spinner size='sm' color='current' /> : 'Salvar'}
          </Button>
        </>
      }
    />
  );
}

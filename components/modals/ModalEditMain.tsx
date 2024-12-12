import { useSocket } from '@/app/context/SocketContext';
import { api } from '@/providers/api';
import { MainCharacterInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import ModalComponent from './Modal';

export default function ModalEditMain({
  isOpen,
  onClose,
  onOpenChange,
  mainCharacter,
  setMainCharacter,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  mainCharacter: MainCharacterInterface;
  setMainCharacter: Dispatch<SetStateAction<MainCharacterInterface>>;
}) {
  const [name, setName] = useState(mainCharacter.name);
  const [age, setAge] = useState(mainCharacter.age);
  const [xp, setXp] = useState(mainCharacter.xp);
  const [weightLimit, setWeightLimit] = useState(mainCharacter.weightLimit);
  const [mainCharacterClass, setMainCharacterClass] = useState(
    mainCharacter.class
  );
  const [race, setRace] = useState(mainCharacter.race);
  const [origin, setOrigin] = useState(mainCharacter.origin);
  const [divinity, setDivinity] = useState(mainCharacter.divinity);
  const [ts, setTs] = useState(mainCharacter.ts);
  const [tp, setTp] = useState(mainCharacter.tp);
  const [to, setTo] = useState(mainCharacter.to);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  const { emitStatusCharacter, emitXPCharacter } = useSocket();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isSubmitting) return;

      setIsSubmitting(true);

      await api.put(`/characters/${id}/main`, {
        name,
        age,
        xp,
        class: mainCharacterClass,
        origin,
        race,
        divinity,
        weightLimit,
        ts,
        tp,
        to,
      });

      setMainCharacter((prev) => ({
        ...prev,
        name,
        age,
        xp,
        class: mainCharacterClass,
        origin,
        race,
        divinity,
        weightLimit,
        ts,
        tp,
        to,
      }));

      if (
        ts != mainCharacter.ts ||
        tp != mainCharacter.tp ||
        to != mainCharacter.to
      ) {
        emitStatusCharacter(
          {
            characterId: Number(id),
            key: 'money',
            value: convertMoney({ ts, tp, to }),
          },
          () => {}
        );
      }

      if (xp != mainCharacter.xp) {
        emitXPCharacter(
          {
            characterId: Number(id),
            xp,
          },
          () => {}
        );
      }

      toast.success('Personagem editado com sucesso');

      setName('');
      setAge(0);
      setXp(0);
      setWeightLimit(0);
      setMainCharacterClass('');
      setRace('');
      setOrigin('');
      setDivinity('');
      setTs(0);
      setTp(0);
      setTo(0);

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
      title='Editar Personagem'
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
            placeholder='Joui Jouki'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Idade'
            labelPlacement='outside'
            placeholder='1'
            type='number'
            value={age.toString()}
            onChange={(e) => setAge(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='XP'
            labelPlacement='outside'
            placeholder='100'
            type='number'
            value={xp.toString()}
            onChange={(e) => setXp(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Limite de Peso'
            labelPlacement='outside'
            placeholder='10'
            type='number'
            value={weightLimit.toString()}
            onChange={(e) => setWeightLimit(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Classe'
            labelPlacement='outside'
            placeholder='Arcanista'
            type='text'
            value={mainCharacterClass}
            onChange={(e) => setMainCharacterClass(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Raça'
            labelPlacement='outside'
            placeholder='Elfo'
            type='text'
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Origem'
            labelPlacement='outside'
            placeholder='Charlatão'
            type='text'
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Divinidade'
            labelPlacement='outside'
            placeholder='Nimb'
            type='text'
            value={divinity}
            onChange={(e) => setDivinity(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Tibar'
            labelPlacement='outside'
            placeholder='100'
            type='number'
            value={ts.toString()}
            onChange={(e) => setTs(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Tibar de Prata'
            labelPlacement='outside'
            placeholder='10'
            type='number'
            value={tp.toString()}
            onChange={(e) => setTp(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Tibar de Ouro'
            labelPlacement='outside'
            placeholder='1'
            type='number'
            value={to.toString()}
            onChange={(e) => setTo(Number(e.target.value))}
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

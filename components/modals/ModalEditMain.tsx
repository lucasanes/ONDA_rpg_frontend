import { MainCharacterInterface } from '@/types/character';
import { Button, Input } from '@nextui-org/react';
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
  const [level, setLevel] = useState(mainCharacter.level);
  const [xp, setXp] = useState(mainCharacter.xp);
  const [mainCharacterClass, setMainCharacterClass] = useState(
    mainCharacter.class
  );
  const [race, setRace] = useState(mainCharacter.race);
  const [divinity, setDivinity] = useState(mainCharacter.divinity);
  const [ts, setTs] = useState(mainCharacter.ts);
  const [tp, setTp] = useState(mainCharacter.tp);
  const [to, setTo] = useState(mainCharacter.to);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //ToDo: Implementar chamada a API

      //const response = await api.put('/character/${id}/main', { });

      setMainCharacter((prev) => ({
        ...prev,
        name,
        level,
        xp,
        class: mainCharacterClass,
        race,
        divinity,
        ts,
        tp,
        to,
      }));

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar personagem');
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
            label='Level'
            labelPlacement='outside'
            placeholder='1'
            type='number'
            value={level.toString()}
            onChange={(e) => setLevel(Number(e.target.value))}
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
          <Button type='submit' color='primary'>
            Salvar
          </Button>
        </>
      }
    />
  );
}
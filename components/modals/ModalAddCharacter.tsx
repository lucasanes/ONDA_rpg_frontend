import { useAuth } from '@/app/context/AuthContext';
import { api } from '@/providers/api';
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
  const [xp, setXp] = useState(0);
  const [age, setAge] = useState(0);
  const [characterClass, setCharacterClass] = useState('');
  const [race, setRace] = useState('');
  const [origin, setOrigin] = useState('');
  const [divinity, setDivinity] = useState('');
  const [hp, setPv] = useState(0);
  const [mp, setPm] = useState(0);
  const [portrait, setPortrait] = useState('');

  const { user } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post('/characters', {
        name,
        xp,
        age,
        class: characterClass,
        race,
        origin,
        divinity,
        hp,
        mp,
        portrait,
        userId: user?.id,
      });

      setCharacters((characters) => [
        ...characters,
        {
          id: response.data.id,
          name,
          currentHp: hp,
          hp,
          isPublic: false,
          userId: response.data.userId,
          currentMp: mp,
          mp,
          mun: 0,
          currentMun: 0,
          to: 0,
          tp: 0,
          ts: 0,
          xp,
          portrait,
        },
      ]);

      toast.success('Personagem criado com sucesso');

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar personagem');
    }
  }

  return (
    <ModalComponent
      title='Criar Personagem'
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
            label='XP'
            labelPlacement='outside'
            placeholder='999'
            type='number'
            value={xp.toString()}
            onChange={(e) => setXp(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Idade'
            labelPlacement='outside'
            placeholder='24'
            type='number'
            value={age.toString()}
            onChange={(e) => setAge(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Classe'
            labelPlacement='outside'
            placeholder='Arcanista'
            type='text'
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
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
            label='Divindade'
            labelPlacement='outside'
            placeholder='Nimb'
            type='text'
            value={divinity}
            onChange={(e) => setDivinity(e.target.value)}
          />

          <Input
            isRequired
            required
            label='Vida (PV)'
            labelPlacement='outside'
            placeholder='16'
            type='number'
            value={hp.toString()}
            onChange={(e) => setPv(Number(e.target.value))}
          />

          <Input
            isRequired
            required
            label='Mana (PM)'
            labelPlacement='outside'
            placeholder='8'
            type='number'
            value={mp.toString()}
            onChange={(e) => setPm(Number(e.target.value))}
          />

          <FileInput
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

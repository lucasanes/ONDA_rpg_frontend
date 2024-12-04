import { api } from '@/providers/api';
import { CharactersInterface } from '@/types/character';
import { InviteInterface } from '@/types/invite';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';

export function InviteCard({
  invite,
  setInvites,
  characters,
}: {
  invite: InviteInterface;
  setInvites: React.Dispatch<React.SetStateAction<InviteInterface[]>>;
  characters: CharactersInterface[];
}) {
  const [characterId, setCharacterId] = useState<number | null>(null);

  async function handleDelete(e: FormEvent) {
    e.preventDefault();

    try {
      await api.delete(`/invites/${invite.id}`);

      toast.success('Convite recusado com sucesso');

      setInvites((invites) => invites.filter((each) => each.id !== invite.id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao recusar convite');
    }
  }

  async function handleJoin() {
    try {
      if (!characterId) {
        toast.error('Selecione uma ficha');
        return;
      }

      await api.put(`/invites/${invite.id}`, {
        characterId,
      });

      toast.success('Personagem adicionado com sucesso');

      setInvites((invites) => invites.filter((each) => each.id !== invite.id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao adicionar personagem');
    }
  }

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <CardHeader className='h-14 justify-between'>
        <h1 className='capitalize'>Convite - {invite.session.name}</h1>

        <DeleteButton onPress={handleDelete}>
          <span className='text-danger'>Recusar</span>
        </DeleteButton>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody>
        <p>Descrição: {invite.session.description}</p>
        <p className='capitalize'>
          Jogadores:{' '}
          {invite.session.players.length && invite.session.players.join(', ')}
        </p>
      </CardBody>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardFooter className='flex justify-center items-baseline gap-3'>
        <Select
          onChange={(e) => setCharacterId(Number(e.target.value))}
          size='sm'
          placeholder='Escolher ficha'
        >
          {characters.map((char) => (
            <SelectItem key={char.id} value={char.id}>
              {char.name}
            </SelectItem>
          ))}
        </Select>
        <Button size='sm' className='w-20 sm:w-44 mt-2' onPress={handleJoin}>
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}

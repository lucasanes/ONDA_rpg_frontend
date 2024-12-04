import { api } from '@/providers/api';
import { SessionInterface } from '@/types/session';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  useDisclosure,
} from '@nextui-org/react';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ModalEditSession from './modals/ModalEditSession';

export function SessionCard({
  session,
  setSessions,
}: {
  session: SessionInterface;
  setSessions: React.Dispatch<React.SetStateAction<SessionInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  async function handleDelete(e: FormEvent) {
    e.preventDefault();

    try {
      await api.delete(`/sessions/${session.id}`);

      toast.success('Sessão deletada com sucesso');

      setSessions((sessions) =>
        sessions.filter((sess) => sess.id !== session.id)
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar sessão');
    }
  }

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <ModalEditSession
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setSessions={setSessions}
        session={session}
        id={session.id}
      />
      <CardHeader className='h-14 justify-between'>
        <h1 className='capitalize'>{session.name}</h1>

        <div className='flex gap-3'>
          <EditButton onPress={onOpen} size={15} />
          <DeleteButton onPress={handleDelete} />
        </div>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody>
        <p>Descrição: {session.description}</p>
        <p className='capitalize'>Jogadores: {session.players.join(', ')}</p>
      </CardBody>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardFooter>
        <Button as={Link} href={`/session/${session.id}`} className='w-full'>
          Acessar Painel
        </Button>
      </CardFooter>
    </Card>
  );
}

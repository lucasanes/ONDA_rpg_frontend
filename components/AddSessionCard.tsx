import { SessionInterface } from '@/types/session';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from '@nextui-org/react';
import ModalAddSession from './modals/ModalAddSession';

export function AddSessionCard({
  setSessions,
}: {
  setSessions: React.Dispatch<React.SetStateAction<SessionInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 border-dotted'>
      <CardHeader className='h-14'>
        <h1>Criar Sessão</h1>
      </CardHeader>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardBody>
        <p>Para criar sua sessão basta clicar no botão abaixo.</p>
      </CardBody>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardFooter>
        <Button onPress={onOpen} className='w-full'>
          Criar
        </Button>
        <ModalAddSession
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          setSessions={setSessions}
        />
      </CardFooter>
    </Card>
  );
}

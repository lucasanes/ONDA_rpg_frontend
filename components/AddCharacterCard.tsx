import { CharactersInterface } from '@/types/character';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from '@nextui-org/react';
import ModalAddCharacter from './modals/ModalAddCharacter';

export function AddCharacterCard({
  setCharacters,
}: {
  setCharacters: React.Dispatch<React.SetStateAction<CharactersInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 border-dotted'>
      <CardHeader className='h-14'>
        <h1>Criar Ficha</h1>
      </CardHeader>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardBody>
        <p>Para criar sua ficha basta clicar no botão abaixo.</p>
      </CardBody>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardFooter>
        <Button onPress={onOpen} className='w-full'>
          Criar
        </Button>
        <ModalAddCharacter
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          setCharacters={setCharacters}
        />
      </CardFooter>
    </Card>
  );
}

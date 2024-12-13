import { useDisabled } from '@/app/context/DisabledContext';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { FormEvent } from 'react';
import { BiTrash } from 'react-icons/bi';
import ModalDelete from './modals/ModalDelete';

export default function DeleteButton({
  onPress,
  size = 18,
  children,
}: {
  onPress: (e: FormEvent) => void;
  size?: number;
  children?: React.ReactNode;
}) {
  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onPress={onPress}
      />
      <Button
        onPress={onOpen}
        className='min-w-0'
        variant='light'
        size='sm'
        isDisabled={disabled}
      >
        {children ? children : <BiTrash className='text-red-500' size={size} />}
      </Button>
    </>
  );
}

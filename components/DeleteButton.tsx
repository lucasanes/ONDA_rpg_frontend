import { useDisabled } from '@/app/context/DisabledContext';
import { Button } from '@nextui-org/button';
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { BiTrash } from 'react-icons/bi';

export default function DeleteButton({
  onPress,
  size = 18,
}: {
  onPress: () => void;
  size?: number;
}) {
  const { disabled } = useDisabled();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        backdrop='blur'
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <form onSubmit={onPress}>
            <ModalHeader className='flex justify-between'>
              Tem certeza que deseja excluir?
            </ModalHeader>
            <Divider />
            <ModalBody>
              <p className='py-4'>Essa ação não pode ser desfeita.</p>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button onPress={onClose} variant='flat' color='danger'>
                Não, cancelar
              </Button>
              <Button type='submit' color='primary'>
                Sim, excluir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Button
        onPress={onOpen}
        className='min-w-1'
        variant='light'
        size='sm'
        isDisabled={disabled}
      >
        <BiTrash className='text-red-800' size={size} />
      </Button>
    </>
  );
}

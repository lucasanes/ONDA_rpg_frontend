import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FormEvent } from 'react';

export default function ModalDelete({
  isOpen,
  onClose,
  onOpenChange,
  onPress,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  onPress: (e: FormEvent) => void;
}) {
  return (
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
  );
}

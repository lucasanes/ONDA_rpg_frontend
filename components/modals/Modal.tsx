import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FormEvent } from 'react';
import DeleteButton from '../DeleteButton';

export default function ModalComponent({
  placement,
  isOpen,
  onOpenChange,
  title,
  bodyContent,
  footerContent,
  handleSubmit,
  handleDelete,
}: {
  placement?:
    | 'top'
    | 'top-center'
    | 'bottom'
    | 'bottom-center'
    | 'center'
    | 'auto';
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  bodyContent: React.ReactNode;
  footerContent: React.ReactNode;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
}) {
  return (
    <Modal
      scrollBehavior='outside'
      placement={placement}
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className='flex justify-between'>
            {title}
            {handleDelete && <DeleteButton onPress={handleDelete} />}
          </ModalHeader>
          <Divider />
          <ModalBody className='p-5'>{bodyContent}</ModalBody>
          <Divider />
          <ModalFooter>{footerContent}</ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

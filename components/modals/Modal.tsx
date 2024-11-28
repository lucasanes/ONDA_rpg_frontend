import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FormEvent } from 'react';

export default function ModalComponent({
  isOpen,
  onOpenChange,
  title,
  bodyContent,
  footerContent,
  handleSubmit,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  bodyContent: React.ReactNode;
  footerContent: React.ReactNode;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Modal
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <Divider />
          <ModalBody className='p-5'>{bodyContent}</ModalBody>
          <Divider />
          <ModalFooter>{footerContent}</ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

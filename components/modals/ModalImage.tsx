import { Image, Modal, ModalContent } from '@nextui-org/react';

export default function ModalImage({
  isOpen,
  onClose,
  onOpenChange,
  image,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  image: string;
}) {
  return (
    <Modal
      placement='top'
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='5xl'
    >
      <ModalContent>
        <Image src={image} width='100%' height='100%' />
      </ModalContent>
    </Modal>
  );
}

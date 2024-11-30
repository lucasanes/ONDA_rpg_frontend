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
      placement='center'
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='full'
      onClick={onClose}
    >
      <ModalContent className='bg-transparent flex items-center'>
        <Image src={image} className='' />
      </ModalContent>
    </Modal>
  );
}

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
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='full'
      onClick={onClose}
    >
      <ModalContent className='bg-transparent flex justify-center items-center'>
        <Image src={image} className='w-full h-full' />
      </ModalContent>
    </Modal>
  );
}

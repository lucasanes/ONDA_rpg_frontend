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
      <ModalContent className='bg-transparent flex w-full h-full justify-center items-center'>
        <div className='flex w-full h-full justify-center'>
          <Image
            src={image}
            className='max-w-full max-h-full w-full h-full object-contain'
          />
        </div>
      </ModalContent>
    </Modal>
  );
}

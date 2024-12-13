import { Button } from '@nextui-org/button';
import { Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ModalComponent from './Modal';

export function ModalChangeVolume({
  isOpen,
  onClose,
  onOpenChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) {
  const [volume, setVolume] = useState(1);

  function handleSubmit() {
    localStorage.setItem('@ONDA:volume', String(volume));

    setVolume(1);

    onClose();
  }

  useEffect(() => {
    const volume = localStorage.getItem('@ONDA:volume');

    if (volume) {
      setVolume(Number(volume));
    }
  }, []);

  return (
    <ModalComponent
      title='Alterar Volume'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <>
          <Slider
            label='Volume'
            color='secondary'
            size='md'
            minValue={1}
            value={volume}
            maxValue={10}
            step={1}
            defaultValue={1}
            onChange={(value) => setVolume(Number(value))}
          />
        </>
      }
      footerContent={
        <>
          <Button onPress={onClose} variant='flat' color='danger'>
            Cancelar
          </Button>
          <Button onPress={handleSubmit} variant='flat' color='success'>
            Salvar
          </Button>
        </>
      }
    />
  );
}

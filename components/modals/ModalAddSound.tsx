import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SoundInput from '../SoundInput';
import ModalComponent from './Modal';

export function ModalAddSound({
  isOpen,
  onClose,
  onOpenChange,
  currentPath,
  fetchData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  currentPath: string;
  fetchData: () => void;
}) {
  const [name, setName] = useState('');
  const [sound, setSound] = useState('');

  function handleSubmit() {
    try {
      if (sound.includes('https://firebasestorage.googleapis.com')) {
        fetchData();

        setName('');
        setSound('');

        onClose();
      } else {
        toast.error('Selecione um arquivo de som válido');
      }
    } catch (error) {
      toast.error('Erro ao adicionar som');
    }
  }

  useEffect(() => {
    if (sound.includes('https://firebasestorage.googleapis.com')) {
      handleSubmit();
    }
  }, [sound]);

  return (
    <ModalComponent
      title='Adicionar Som'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      handleSubmit={handleSubmit}
      bodyContent={
        <>
          <Input
            required
            isRequired
            label={'Nome'}
            labelPlacement='outside'
            placeholder='Digite o nome do som'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {name.length > 0 && (
            <SoundInput
              label={'Som'}
              placeholder='Selecione um som'
              path={currentPath}
              fileName={name}
              value={sound}
              setValue={setSound}
            />
          )}
        </>
      }
      footerContent={
        <>
          <Button onPress={onClose} variant='flat' color='danger'>
            Cancelar
          </Button>
        </>
      }
    />
  );
}

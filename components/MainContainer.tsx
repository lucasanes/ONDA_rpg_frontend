import { specialElite } from '@/config/fonts';
import { MainCharacterInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { xpToLevel } from '@/utils/xp-level';
import { Divider, Input, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { BiCoin } from 'react-icons/bi';
import EditButton from './EditButton';
import ModalEditMain from './modals/ModalEditMain';
import { SoundPlayer } from './SoundPlayer';

export function MainContainer({
  userId,
  initialMainCharacter,
}: {
  userId: number;
  initialMainCharacter: MainCharacterInterface;
}) {
  const [mainCharacter, setMainCharacter] =
    useState<MainCharacterInterface>(initialMainCharacter);

  const { name, xp, divinity, origin, race, weightLimit, tp, to, tc, age } =
    mainCharacter;

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <ModalEditMain
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        mainCharacter={mainCharacter}
        setMainCharacter={setMainCharacter}
      />
      <div className='flex justify-between'>
        <h1 className='text-xl'>Principal</h1>
        <EditButton onPress={onOpen} />
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

      <span>Clique aqui para (des)ativar os sons</span>
      <SoundPlayer userId={userId} />

      <Input
        variant='bordered'
        size='md'
        disabled
        label='Nome'
        value={name}
        className='mt-6'
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Level'
        value={xpToLevel(xp).toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='XP'
        value={xp.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Limite de Peso'
        value={weightLimit.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Idade'
        value={age.toString()}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Classe'
        value={mainCharacter.class}
      />
      <Input variant='bordered' size='md' disabled label='Raça' value={race} />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Origem'
        value={origin}
      />
      <Input
        variant='bordered'
        size='md'
        disabled
        label='Divindade'
        value={divinity}
      />
      <Input
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar de Cobre $'
        value={tc.toString()}
      />
      <Input
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar de Prata $'
        value={tp.toString()}
      />
      <Input
        startContent={<BiCoin className='mb-0.5' />}
        variant='bordered'
        size='md'
        disabled
        label='$ Tibar de Ouro $'
        value={to.toString()}
      />

      <div className='flex items-center gap-1'>
        <img src='/coin.png' width={25} height={25} />
        <span className={`text-xl mt-1 ${specialElite.className}`}>
          {convertMoney(mainCharacter)}
        </span>
      </div>
    </div>
  );
}

import { useSocket } from '@/app/context/SocketContext';
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

type RollDice = {
  total: number;
  quantity: number;
  faces: number;
  rolls: number[];
};

type Dice = {
  total: number;
  dice: string;
  bonus: string;
  rollDices: RollDice[];
  isCritical: boolean;
  isDisaster: boolean;
};

export default function ModalDice({
  dice,
  isD20,
  criticalMargin,
  sessionId,
  characterId,
  isOpen,
  onOpenChange,
}: {
  dice: string;
  isD20: boolean;
  criticalMargin: string;
  sessionId: number | null;
  characterId: number | null;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const [diceValue, setDiceValue] = useState<Dice>({
    total: 0,
    isCritical: false,
    isDisaster: false,
    dice: '',
    bonus: '',
    rollDices: [],
  });

  const { emitRollDice } = useSocket();

  function rollDice(totalDice: string) {
    if (isD20) {
      const dice = totalDice.split('+')[0];
      const bonus = totalDice.split('+').slice(1).join('+');

      const roll = Math.floor(Math.random() * 20 + 1);

      const bonusValue = totalDice
        .split('+')
        .slice(1)
        .reduce((acc, curr) => acc + Number(curr), 0);

      const isCritical = roll >= Number(criticalMargin);
      const isDisaster = roll === 1;

      setDiceValue({
        total: roll + bonusValue,
        dice,
        isCritical,
        isDisaster,
        bonus: `(${bonus || 0})`,
        rollDices: [
          {
            total: roll,
            quantity: 1,
            faces: 20,
            rolls: [roll],
          },
        ],
      });

      emitRollDice({
        characterId,
        isDisaster,
        isCritical,
        isD20,
        sessionId,
        value: roll + bonusValue,
      });
    } else {
      const parts = totalDice.split('+');

      let dices: string[] = [];
      let bonuses: string[] = [];

      parts.forEach((part) => {
        if (part.includes('d')) {
          dices.push(part);
        } else {
          bonuses.push(part);
        }
      });

      const rollDices: RollDice[] = dices.map((dice) => {
        const quantity = Number(dice.split('d')[0]);
        const faces = Number(dice.split('d')[1]);

        const rolls = Array.from({ length: quantity }, () =>
          Math.floor(Math.random() * faces + 1)
        );

        const total = rolls.reduce((acc, curr) => acc + curr, 0);

        return {
          total,
          rolls,
          quantity,
          faces,
        };
      });

      const bonusValue = bonuses.reduce((acc, curr) => acc + Number(curr), 0);

      const totalDices = rollDices.reduce((acc, curr) => acc + curr.total, 0);

      let disasterValue = 0;
      let criticalValue = 0;

      rollDices.forEach((roll) => {
        disasterValue += roll.quantity;
        criticalValue += roll.faces * roll.quantity;
      });

      const isCritical = totalDices === criticalValue;

      const isDisaster = totalDices === disasterValue;

      setDiceValue({
        isCritical,
        isDisaster,
        total: totalDices + bonusValue,
        dice: dices.join('+'),
        bonus: `(${bonuses.join('+') || 0})`,
        rollDices,
      });

      emitRollDice({
        characterId,
        sessionId,
        isDisaster,
        isD20,
        isCritical,
        value: totalDices + bonusValue,
      });
    }
  }

  useEffect(() => {
    rollDice(dice);
  }, []);

  return (
    <Modal
      scrollBehavior='outside'
      backdrop='blur'
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className='flex justify-between'>
          <h1 className='text-2xl'>Resultado</h1>
        </ModalHeader>
        <Divider />
        <ModalBody className='p-5'>
          <h2
            className={`text-xl ${diceValue.isCritical && 'text-green-400'} ${diceValue.isDisaster && 'text-red-500'}`}
          >
            {diceValue.rollDices.map((roll) => roll.total).join('+')}
            {`+${diceValue.bonus}`} = {diceValue.total}
          </h2>
        </ModalBody>
        <Divider />
        <ModalFooter className='flex flex-col justify-start'>
          {diceValue.rollDices.map((roll, i) => (
            <span key={i} className='text-lg'>
              {roll.quantity}d{roll.faces}:{' '}
              {roll.rolls.map((r) => r).join(', ')}
            </span>
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
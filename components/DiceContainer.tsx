import { useDisabled } from '@/app/context/DisabledContext';
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { RiShareForwardLine } from 'react-icons/ri';
import ModalDice from './modals/ModalDice';

export default function DiceContainer({
  characterId,
  sessionId,
}: {
  characterId: number | null;
  sessionId: number | null;
}) {
  const [isD20, setIsD20] = useState(true);
  const [dice, setDice] = useState('');
  const [criticalMargin, setCriticalMargin] = useState('20');

  const { disabled } = useDisabled();

  const [isInvalid, setIsInvalid] = useState(false);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  function handleRollDice(e: FormEvent) {
    e.preventDefault();

    if (isD20) {
      const regex = /^\+(\d{1,2})(\+\d{1,2})*$/;

      if (dice.length && !regex.test(dice)) {
        setIsInvalid(true);
        return;
      }
    } else {
      const regex =
        /^(\d{1,2}d(20|[1-9]|1[0-9])(\+\d{1,2}d(20|[1-9]|1[0-9])|\+\d+)*)$/;

      if (dice.length && !regex.test(dice)) {
        setIsInvalid(true);
        return;
      }
    }

    setIsInvalid(false);

    onOpen();
  }

  function diceMask(dice: string) {
    if (isD20) {
      return `1d20${dice}`;
    }

    return dice;
  }

  function updateDice(dice: string) {
    setIsInvalid(false);

    const regex = /^[d\d\+]+$/;

    if (dice.length && !regex.test(dice)) {
      setIsInvalid(true);
      return;
    }

    if (isD20) {
      const realDice = dice.slice(4);

      setDice(realDice);
      return;
    }

    setDice(dice);
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      <form onSubmit={handleRollDice}>
        {isOpen && (
          <ModalDice
            characterId={characterId}
            dice={dice}
            isD20={isD20}
            criticalMargin={criticalMargin}
            sessionId={sessionId}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
        <div className='flex justify-start'>
          <h1 className='text-xl mb-4'>Dado</h1>
        </div>
        <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

        <div className='flex gap-4 justify-between items-baseline mt-4 mb-2'>
          <Input
            isInvalid={isInvalid}
            isRequired
            required
            variant='bordered'
            size='md'
            label='Valor do Dado'
            labelPlacement='outside'
            placeholder={isD20 ? '+5' : '1d6+2'}
            value={diceMask(dice)}
            onChange={(e) => updateDice(e.target.value)}
          />
          <Button
            className='min-w-1 text-cyan-400 relative top-1'
            variant='light'
            isDisabled={disabled}
            type='submit'
          >
            <RiShareForwardLine size={21} />
          </Button>
        </div>
        <div className='flex gap-4 justify-between items-center'>
          <Checkbox
            size='sm'
            isSelected={isD20}
            onChange={() => {
              setDice('');
              setIsD20(!isD20);
            }}
          >
            D20?
          </Checkbox>
          <Select
            size='sm'
            isDisabled={disabled}
            selectedKeys={[criticalMargin]}
            onChange={(e) => setCriticalMargin(e.target.value)}
          >
            <SelectItem key={'20'} value={'20'}>
              20
            </SelectItem>
            <SelectItem key={'19'} value={'19'}>
              19
            </SelectItem>
            <SelectItem key={'18'} value={'18'}>
              18
            </SelectItem>
            <SelectItem key={'17'} value={'17'}>
              17
            </SelectItem>
            <SelectItem key={'16'} value={'16'}>
              16
            </SelectItem>
            <SelectItem key={'15'} value={'15'}>
              15
            </SelectItem>
          </Select>
        </div>
      </form>
    </div>
  );
}

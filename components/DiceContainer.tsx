import { useDisabled } from '@/app/context/DisabledContext';
import {
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { RiShareForwardLine } from 'react-icons/ri';
import IconButton from './IconButton';
import ModalDice from './modals/ModalDice';

export default function DiceContainer({
  name,
  portrait,
  characterId,
  sessionId,
}: {
  name: string;
  portrait: string | null;
  characterId: number | null;
  sessionId: number | null;
}) {
  const [is1D20, setIs1D20] = useState(true);
  const [is2D20, setIs2D20] = useState(false);
  const [dice, setDice] = useState('');
  const [criticalMargin, setCriticalMargin] = useState('20');

  const { disabled } = useDisabled();

  const [isInvalid, setIsInvalid] = useState(false);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  function handleRollDice(e: FormEvent) {
    e.preventDefault();

    if (is1D20 || is2D20) {
      const regex = /^\+(\d{1,2})(\+\d{1,2})*$/;

      if (dice.length && !regex.test(dice)) {
        setIsInvalid(true);
        return;
      }
    } else {
      const regex = /^(\d{1,2}d(\d{1,3})(\+\d{1,2}d(\d{1,3})|\+\d+)*)$/;

      if (dice.length && !regex.test(dice)) {
        setIsInvalid(true);
        return;
      }
    }

    setIsInvalid(false);

    onOpen();
  }

  function diceMask(dice: string) {
    if (is1D20) {
      return `1d20${dice}`;
    }

    if (is2D20) {
      return `2d20${dice}`;
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

    if (is1D20 || is2D20) {
      const realDice = dice.slice(4);

      setDice(realDice);
      return;
    }

    setDice(dice);
  }

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2'>
      {isOpen && (
        <ModalDice
          name={name}
          portrait={portrait}
          characterId={characterId}
          dice={dice}
          is1D20={is1D20}
          is2D20={is2D20}
          criticalMargin={criticalMargin}
          sessionId={sessionId}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      <div className='h-10 flex justify-start items-center'>
        <h1 className='text-xl pt-1'>Dado</h1>
      </div>
      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

      <form onSubmit={handleRollDice}>
        <div className='flex gap-4 justify-between items-baseline mt-4 mb-2'>
          <Input
            isInvalid={isInvalid}
            isRequired
            required
            variant='bordered'
            size='md'
            label='Valor do Dado'
            labelPlacement='outside'
            placeholder={is1D20 ? '+5' : '1d6+2'}
            value={diceMask(dice)}
            onChange={(e) => updateDice(e.target.value)}
          />
          <IconButton className='relative top-1' type='submit'>
            <RiShareForwardLine size={21} />
          </IconButton>
        </div>
        <div className='flex gap-4 justify-between items-center'>
          <Checkbox
            size='sm'
            isSelected={is1D20}
            onChange={() => {
              setDice('');
              setIs1D20(!is1D20);
              setIs2D20(false);
            }}
          >
            1d20?
          </Checkbox>
          <Checkbox
            size='sm'
            isSelected={is2D20}
            onChange={() => {
              setDice('');
              setIs2D20(!is2D20);
              setIs1D20(false);
            }}
          >
            2d20?
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

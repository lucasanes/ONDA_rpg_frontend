import { useDisabled } from '@/app/context/DisabledContext';
import { Button } from '@nextui-org/button';
import { GrAdd } from 'react-icons/gr';

export default function AddButton({
  onPress,
  size = 18,
}: {
  onPress: () => void;
  size?: number;
}) {
  const { disabled } = useDisabled();

  return (
    <Button
      onPress={onPress}
      className='min-w-1'
      variant='light'
      size='sm'
      isDisabled={disabled}
    >
      <GrAdd className='text-green-400' size={size} />
    </Button>
  );
}

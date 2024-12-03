import { useDisabled } from '@/app/context/DisabledContext';
import { Button } from '@nextui-org/button';
import { Input, Progress } from '@nextui-org/react';

export default function StatusBar({
  color,
  maxValue,
  currentValue,
  onCurrentValueUpdate,
  onMaxValueUpdate,
}: {
  color: string;
  maxValue: number;
  currentValue: number;
  onCurrentValueUpdate: (value: number) => void;
  onMaxValueUpdate: (value: number) => void;
}) {
  const { disabled } = useDisabled();

  return (
    <>
      <div
        className={`flex items-center ${maxValue > 0 ? 'justify-between' : 'justify-center'}`}
      >
        {maxValue > 0 && (
          <div>
            <Button
              variant='light'
              className='min-w-10 hidden xs:inline-block md:hidden lg:inline-block'
              onPress={() => {
                onCurrentValueUpdate(0);
              }}
              isDisabled={disabled}
            >
              {'<<'}
            </Button>

            <Button
              variant='light'
              className='min-w-10 hidden xxs:inline-block'
              onPress={() => {
                if (currentValue - 5 < 0) {
                  onCurrentValueUpdate(0);
                  return;
                }
                onCurrentValueUpdate(currentValue - 5);
              }}
              isDisabled={disabled}
            >
              - 5
            </Button>

            <Button
              variant='light'
              className='min-w-10'
              onPress={() => {
                if (currentValue == 0) return;
                onCurrentValueUpdate(currentValue - 1);
              }}
              isDisabled={disabled}
            >
              - 1
            </Button>
          </div>
        )}

        <div className='flex items-center justify-center'>
          <Input
            isDisabled={disabled}
            className='max-w-10'
            size='sm'
            type='number'
            value={currentValue.toString()}
            onChange={(e) => {
              if (Number(e.target.value) > maxValue) {
                return;
              }
              onCurrentValueUpdate(Number(e.target.value));
            }}
          />
          <span className='mx-1'>/</span>
          <Input
            isDisabled={disabled}
            className='max-w-10'
            size='sm'
            type='number'
            value={maxValue.toString()}
            onChange={(e) => {
              if (e.target.value.length > 3) {
                return;
              }

              if (Number(e.target.value) < currentValue) {
                onCurrentValueUpdate(Number(e.target.value));
              }

              onMaxValueUpdate(Number(e.target.value));
            }}
          />
        </div>

        {maxValue > 0 && (
          <div>
            <Button
              variant='light'
              className='min-w-10'
              onPress={() => {
                if (currentValue == maxValue) return;
                onCurrentValueUpdate(currentValue + 1);
              }}
              isDisabled={disabled}
            >
              + 1
            </Button>

            <Button
              variant='light'
              className='min-w-10 hidden xxs:inline-block'
              onPress={() => {
                if (currentValue + 5 > maxValue) {
                  onCurrentValueUpdate(maxValue);
                  return;
                }
                onCurrentValueUpdate(currentValue + 5);
              }}
              isDisabled={disabled}
            >
              + 5
            </Button>

            <Button
              variant='light'
              className='min-w-10 hidden xs:inline-block md:hidden lg:inline-block'
              onPress={() => {
                onCurrentValueUpdate(maxValue);
              }}
              isDisabled={disabled}
            >
              {'>>'}
            </Button>
          </div>
        )}
      </div>
      {maxValue > 0 && (
        <Progress
          classNames={{
            indicator: color,
          }}
          maxValue={maxValue}
          value={currentValue}
        />
      )}
    </>
  );
}

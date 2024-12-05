import { useDisabled } from '@/app/context/DisabledContext';
import { Button } from '@nextui-org/button';
import { ReactNode } from 'react';

export default function IconButton({
  children,
  size = 'md',
  onPress,
  type = 'button',
  className = '',
  ...rest
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  className?: string;
  type?: 'submit' | 'button';
}) {
  const { disabled } = useDisabled();

  return (
    <Button
      className={`min-w-1 text-cyan-400 ${className}`}
      variant='light'
      isDisabled={disabled}
      type={type}
      onPress={onPress}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  );
}

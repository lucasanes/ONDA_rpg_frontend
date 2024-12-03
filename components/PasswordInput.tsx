import { Input } from '@nextui-org/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineLockOpen } from 'react-icons/md';

interface PasswordInputProps {
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function PasswordInput({
  isRequired = true,
  label,
  placeholder,
  value,
  setValue,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      isRequired={isRequired}
      required={isRequired}
      endContent={
        <button type='button' className='w-5 h-5' onClick={handleShowPassword}>
          {showPassword ? (
            <AiOutlineEye size={18} />
          ) : (
            <AiOutlineEyeInvisible size={18} />
          )}
        </button>
      }
      label={label || 'Senha'}
      labelPlacement='outside'
      placeholder={placeholder || 'MelhorRPG123'}
      startContent={<MdOutlineLockOpen size={20} />}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

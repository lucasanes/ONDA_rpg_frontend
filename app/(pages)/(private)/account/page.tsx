'use client';

import { useAuth } from '@/app/context/AuthContext';
import PasswordInput from '@/components/PasswordInput';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from '@nextui-org/react';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';

export default function Account() {
  const { user } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='w-full h-full p-5 flex flex-col items-center overflow-y-auto'>
      <div className='w-72 xs:min-w-96 xs:w-full xs:max-w-2xl'>
        <Card className='w-72 xs:min-w-96 xs:w-full xs:max-w-2xl mt-6'>
          <CardHeader className='flex flex-col items-start'>
            <h1 className='text-xl font-bold'>Minha Conta</h1>
            <p className='text-sm text-gray-300'>
              Aqui você pode alterar suas informações de conta
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <span>
              <strong>Nome de Usuário:</strong>
            </span>

            <p>{user?.username}</p>

            <span className='mt-3'>
              <strong>Email:</strong>
            </span>

            <p>{user?.email}</p>
          </CardBody>
        </Card>
      </div>

      <Card className='w-72 xs:min-w-96 xs:w-full xs:max-w-2xl mt-6'>
        <CardHeader>
          <h1 className='text-xl font-bold'>Editar Conta</h1>
        </CardHeader>
        <Divider />
        <CardBody className='gap-5'>
          <div className='w-full flex flex-col sm:flex-row gap-5'>
            <Input
              isRequired
              required
              label='Nome de usuário'
              labelPlacement='outside'
              placeholder='OndaRPG'
              startContent={<BiUserCircle size={20} />}
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              isRequired
              required
              label='Email'
              labelPlacement='outside'
              placeholder='onda.rpg@gmail.com'
              startContent={<MdOutlineEmail size={20} />}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='w-full flex flex-col sm:flex-row gap-5'>
            <PasswordInput setValue={setPassword} value={password} />

            <PasswordInput
              label='Confirmar senha'
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button type='submit' color='primary'>
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

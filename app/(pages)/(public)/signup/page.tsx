'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from '@nextui-org/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

import PasswordInput from '@/components/PasswordInput';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');

      return;
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-5'>
      <Card className='max-w-xl min-w-72 w-full'>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h1>Cadastro</h1>
          </CardHeader>
          <Divider />
          <CardBody className='flex gap-4'>
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

            <PasswordInput setValue={setPassword} value={password} />

            <PasswordInput
              label='Confirmar senha'
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
          </CardBody>
          <Divider />
          <CardFooter className='flex gap-3'>
            <Button color='primary' type='submit' variant='solid'>
              Cadastrar
            </Button>
            <Button as={Link} color='secondary' href='/' type='button'>
              Já tem uma conta?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

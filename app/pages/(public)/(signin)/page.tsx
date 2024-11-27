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
import { FormEvent, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';

import PasswordInput from '@/components/PasswordInput';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-5'>
      <form onSubmit={handleSubmit}>
        <Card className='max-w-5xl min-w-72 w-full'>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <Divider />
          <CardBody className='flex gap-4'>
            <Input
              isRequired
              label='Email'
              labelPlacement='outside'
              placeholder='onda.rpg@gmail.com'
              startContent={<MdOutlineEmail size={20} />}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput setValue={setPassword} value={password} />
          </CardBody>
          <Divider />
          <CardFooter className='flex gap-3'>
            <Button color='danger' type='button'>
              Registrar
            </Button>
            <Button color='success' type='submit'>
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

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
import { useRouter } from 'next/navigation';
import { BiUserCircle } from 'react-icons/bi';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }

      //Todo: Implementar chamada a API
      // const response = await api.post('/auth/signup', {
      //   username,
      //   email,
      //   password,
      // });

      toast.success('Cadastro realizado com sucesso');
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer cadastro');
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

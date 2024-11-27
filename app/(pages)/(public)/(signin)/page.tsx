'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';

import { useAuth } from '@/app/context/AuthContext';
import PasswordInput from '@/components/PasswordInput';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();
  const { signIn } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn({ email, password, rememberMe });

    router.push('/dashboard');
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-5'>
      <Card className='max-w-xl min-w-72 w-full'>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h1>Login</h1>
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

            <div className='flex justify-between'>
              <Checkbox
                defaultSelected={rememberMe}
                checked={rememberMe}
                size='sm'
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Lembrar-me
              </Checkbox>
              <Link color='secondary' href='/forgot-password' size='sm'>
                Esqueceu a senha?
              </Link>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className='flex gap-3'>
            <Button color='primary' type='submit' variant='solid'>
              Entrar
            </Button>
            <Button as={Link} color='secondary' href='/signup' type='button'>
              Criar uma conta?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

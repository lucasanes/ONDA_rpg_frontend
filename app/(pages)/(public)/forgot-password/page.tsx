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
import { CgPassword } from 'react-icons/cg';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

import PasswordInput from '@/components/PasswordInput';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //Todo: Implementar a chamada para a API
      // const response = api.post('/auth/send-email', { email });

      setStep(2);

      toast.success('Email enviado com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar email');
    }
  }

  async function handleReturn() {
    try {
      if (step == 1) {
        router.push('/');
      }

      if (step == 2) {
        //Todo: Implementar a chamada para a API
        // const response = api.delete('/auth/code', { email });
      }

      setStep(1);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao retornar');
    }
  }

  async function handleCodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //Todo: Implementar a chamada para a API
      // const response = api.post('/auth/code', { email, code });

      setStep(3);

      toast.success('Código validado com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao validar código');
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error('As senhas não coincidem');

        return;
      }

      if (!passwordValidation(password)) {
        toast.error(
          'A senha deve ter entre 8 e 24 caracteres, e conter pelo menos uma letra maiúscula, uma letra minúscula, e um número.'
        );

        return;
      }

      //Todo: Implementar a chamada para a API
      // const response = api.post('/auth/password', { email, password });

      toast.success('Senha alterada com sucesso');

      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao alterar senha');
    }
  }

  function codeValidation(code: string) {
    if (code.length > 6) {
      return false;
    }

    if (code.length % 2 === 0) {
      if (code.charAt(code.length - 1).match(/[A-Za-z]/)) {
        return false;
      }
    } else {
      if (code.charAt(code.length - 1).match(/[0-9]/)) {
        return false;
      }
    }

    return true;
  }

  function passwordValidation(password: string) {
    if (password.length < 8) {
      return false;
    }

    if (password.length > 24) {
      return false;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,24}$/;

    if (!regex.test(password)) {
      return false;
    }

    return true;
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-5'>
      <Card className='max-w-xl min-w-72 w-full'>
        {step == 1 && (
          <form onSubmit={handleEmailSubmit}>
            <CardHeader>
              <h1>Informe seu e-mail</h1>
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
            </CardBody>
            <Divider />
            <CardFooter className='flex gap-3'>
              <Button color='danger' variant='solid' onPress={handleReturn}>
                Voltar
              </Button>
              <Button color='primary' type='submit' variant='solid'>
                Enviar
              </Button>
            </CardFooter>
          </form>
        )}

        {step == 2 && (
          <form onSubmit={handleCodeSubmit}>
            <CardHeader>
              <h1>Informe o código</h1>
            </CardHeader>
            <Divider />
            <CardBody className='flex gap-4'>
              <Input
                isRequired
                required
                label='Código'
                labelPlacement='outside'
                pattern='[A-Za-z0-9]{6}'
                placeholder='A1B2C3'
                startContent={<CgPassword size={20} />}
                type='text'
                value={code}
                onChange={(e) => {
                  if (codeValidation(e.target.value)) {
                    setCode(e.target.value.toUpperCase());
                  }
                }}
              />
            </CardBody>
            <Divider />
            <CardFooter className='flex gap-3'>
              <Button color='danger' variant='solid' onPress={handleReturn}>
                Voltar
              </Button>
              <Button color='primary' type='submit' variant='solid'>
                Enviar
              </Button>
            </CardFooter>
          </form>
        )}

        {step == 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <CardHeader>
              <h1>Altere sua senha</h1>
            </CardHeader>
            <Divider />
            <CardBody className='flex gap-4'>
              <PasswordInput setValue={setPassword} value={password} />

              <PasswordInput
                label='Confirmar senha'
                setValue={setConfirmPassword}
                value={confirmPassword}
              />
            </CardBody>
            <Divider />
            <CardFooter className='flex gap-3'>
              <Button color='danger' variant='solid' onPress={handleReturn}>
                Voltar
              </Button>
              <Button color='primary' type='submit' variant='solid'>
                Enviar
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}

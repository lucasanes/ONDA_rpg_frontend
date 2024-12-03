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
import { api } from '@/providers/api';
import { passwordValidation } from '@/utils/validations';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [userId, setUserId] = useState(0);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post('/auth/send-recovery', { email });

      setStep(2);

      toast.success('Email enviado com sucesso');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  async function handleReturn() {
    try {
      if (step == 1) {
        router.push('/');
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
      const response = await api.post('/auth/validate-recovery', {
        email,
        code,
      });

      setUserId(response.data.userId);

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

      await api.put('/auth/change-password', { userId, password });

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

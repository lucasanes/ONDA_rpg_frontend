'use client';

import { useAuth } from '@/app/context/AuthContext';
import PasswordInput from '@/components/PasswordInput';
import { api } from '@/providers/api';
import { passwordValidation, usernameValidation } from '@/utils/validations';
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
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Account() {
  const { user, signIn } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (!currentPassword) return;
      if (!email && !username && !password) return;

      if (password !== confirmPassword) {
        toast.error('As senhas não coincidem!');
        return;
      }

      if (username.length > 0 && !usernameValidation(username)) {
        toast.error(
          'O nome de usuário deve ter no mínimo 3 caracteres, no máximo 24 caracteres, e não pode conter espaços'
        );
        return;
      }

      if (password.length > 0 && !passwordValidation(password)) {
        toast.error(
          'A senha deve ter entre 8 e 24 caracteres, e conter pelo menos uma letra maiúscula, uma letra minúscula, e um número.'
        );
        return;
      }

      await api.put('/users', {
        username,
        email,
        password,
        currentPassword,
      });

      signIn({
        email: email.length > 0 ? email : user?.email!,
        password: password.length > 0 ? password : currentPassword,
        rememberMe: true,
      });

      toast.success('Conta atualizada com sucesso!');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

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
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h1 className='text-xl font-bold'>Editar Conta</h1>
          </CardHeader>
          <Divider />
          <CardBody className='gap-5'>
            <div className='w-full flex flex-col sm:flex-row gap-5'>
              <Input
                label='Novo Nome de usuário'
                labelPlacement='outside'
                placeholder='OndaRPG'
                startContent={<BiUserCircle size={20} />}
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label='Novo Email'
                labelPlacement='outside'
                placeholder='onda.rpg@gmail.com'
                startContent={<MdOutlineEmail size={20} />}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='w-full flex flex-col sm:flex-row gap-5'>
              <PasswordInput
                label='Nova Senha'
                isRequired={password.length > 0 || confirmPassword.length > 0}
                setValue={setPassword}
                value={password}
              />

              <PasswordInput
                isRequired={password.length > 0 || confirmPassword.length > 0}
                label='Confirmar nova senha'
                setValue={setConfirmPassword}
                value={confirmPassword}
              />
            </div>

            <div className='w-full'>
              <PasswordInput
                label='Senha Atual'
                setValue={setCurrentPassword}
                value={currentPassword}
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button type='submit' color='primary'>
              Salvar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

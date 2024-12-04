'use client';

import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import ModalAddCharacter from '@/components/modals/ModalAddCharacter';
import ModalAddSession from '@/components/modals/ModalAddSession';
import ModalEditSession from '@/components/modals/ModalEditSession';
import { specialElite } from '@/config/fonts';
import { api } from '@/providers/api';
import { CharactersInterface } from '@/types/character';
import { InviteInterface } from '@/types/invite';
import { SessionInterface } from '@/types/session';
import { convertMoney } from '@/utils/convertMoney';
import { xpToLevel, xpToNextLevel } from '@/utils/xp-level';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Progress,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [invites, setInvites] = useState<InviteInterface[]>([]);
  const [sessions, setSessions] = useState<SessionInterface[]>([]);
  const [characters, setCharacters] = useState<CharactersInterface[]>([]);

  const [loading, setLoading] = useState(true);

  const token = Cookies.get('token');

  async function fetchData() {
    try {
      const response = await api.get('/dashboard', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setSessions(response.data.sessions);

      setCharacters(response.data.characters);

      setInvites(response.data.invites);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    //ToDo: Implementar Socket do Convite
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center p-5 gap-5 overflow-y-auto'>
      {loading ? (
        <Spinner size='lg' className='mt-6' />
      ) : (
        <>
          <Container title='Sessões'>
            <AddSessionCard setSessions={setSessions} />
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                setSessions={setSessions}
              />
            ))}
            {invites.map((invite) => (
              <Invite
                key={invite.id}
                invite={invite}
                setInvites={setInvites}
                characters={characters}
              />
            ))}
          </Container>
          <Container title='Personagens'>
            <AddCharacterCard setCharacters={setCharacters} />
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                setCharacters={setCharacters}
              />
            ))}
          </Container>
        </>
      )}
    </div>
  );
}

function Container({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='w-full flex flex-col border-2 rounded-md border-gray-300'>
      <h1 className='m-3 text-lg text-center'>{title}</h1>
      <Divider className='h-0.5 !bg-gray-300' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3 gap-6'>
        {children}
      </div>
    </div>
  );
}

function AddSessionCard({
  setSessions,
}: {
  setSessions: React.Dispatch<React.SetStateAction<SessionInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 border-dotted'>
      <CardHeader className='h-14'>
        <h1>Criar Sessão</h1>
      </CardHeader>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardBody>
        <p>Para criar sua sessão basta clicar no botão abaixo.</p>
      </CardBody>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardFooter>
        <Button onPress={onOpen} className='w-full'>
          Criar
        </Button>
        <ModalAddSession
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          setSessions={setSessions}
        />
      </CardFooter>
    </Card>
  );
}

function AddCharacterCard({
  setCharacters,
}: {
  setCharacters: React.Dispatch<React.SetStateAction<CharactersInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 border-dotted'>
      <CardHeader className='h-14'>
        <h1>Criar Ficha</h1>
      </CardHeader>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardBody>
        <p>Para criar sua ficha basta clicar no botão abaixo.</p>
      </CardBody>
      <Divider className='border-1 !border-gray-500 border-dotted' />
      <CardFooter>
        <Button onPress={onOpen} className='w-full'>
          Criar
        </Button>
        <ModalAddCharacter
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          setCharacters={setCharacters}
        />
      </CardFooter>
    </Card>
  );
}

function SessionCard({
  session,
  setSessions,
}: {
  session: SessionInterface;
  setSessions: React.Dispatch<React.SetStateAction<SessionInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  async function handleDelete(e: FormEvent) {
    e.preventDefault();

    try {
      await api.delete(`/sessions/${session.id}`);

      toast.success('Sessão deletada com sucesso');

      setSessions((sessions) =>
        sessions.filter((sess) => sess.id !== session.id)
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar sessão');
    }
  }

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <ModalEditSession
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setSessions={setSessions}
        session={session}
        id={session.id}
      />
      <CardHeader className='h-14 justify-between'>
        <h1 className='capitalize'>{session.name}</h1>

        <div className='flex gap-3'>
          <EditButton onPress={onOpen} size={15} />
          <DeleteButton onPress={handleDelete} />
        </div>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody>
        <p>Descrição: {session.description}</p>
        <p className='capitalize'>Jogadores: {session.players.join(', ')}</p>
      </CardBody>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardFooter>
        <Button as={Link} href={`/session/${session.id}`} className='w-full'>
          Acessar Painel
        </Button>
      </CardFooter>
    </Card>
  );
}

function CharacterCard({
  character,
  setCharacters,
}: {
  character: CharactersInterface;
  setCharacters: React.Dispatch<React.SetStateAction<CharactersInterface[]>>;
}) {
  const router = useRouter();

  const xpRef = useRef<HTMLDivElement>(null);

  function updateXP(currentXP: number) {
    const xpProgressRef = xpRef.current;

    if (!xpProgressRef) return;

    const quantityXPOfCurrentLevel = xpToNextLevel(xpToLevel(currentXP));
    const quantityXPToNextLevel = xpToNextLevel(xpToLevel(currentXP) + 1);

    const percentage =
      ((currentXP - quantityXPOfCurrentLevel) /
        (quantityXPToNextLevel - quantityXPOfCurrentLevel)) *
      100;

    const degree = (percentage / 100) * 360; // Converte para graus
    xpProgressRef.style.background = `conic-gradient(#43ff5c 0deg ${degree}deg, white ${degree}deg 360deg)`;
  }

  useEffect(() => {
    updateXP(character.xp);
  }, []);

  async function handleDelete(e: FormEvent) {
    e.preventDefault();

    try {
      await api.delete(`/characters/${character.id}`);

      toast.success('Personagem deletado com sucesso');

      setCharacters((characters) =>
        characters.filter((char) => char.id !== character.id)
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar personagem');
    }
  }

  async function handleChangeVisibility() {
    try {
      await api.put(`/characters/${character.id}`, {
        isPublic: !character.isPublic,
      });

      setCharacters((characters) =>
        characters.map((char) =>
          char.id === character.id
            ? { ...char, isPublic: !char.isPublic }
            : char
        )
      );
    } catch (error) {
      console.log(error);
      toast.error('Erro ao alterar visibilidade');
    }
  }

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <CardHeader className='h-14 justify-between'>
        <h1 className='capitalize'>
          {character.name}
          {character.sessionId && ` - ${character.sessionName}`}
        </h1>

        <div className='flex gap-3'>
          <Button
            size='sm'
            className={`min-w-1 ${character.isPublic ? 'text-green-500' : 'text-danger'}`}
            variant='light'
            onPress={handleChangeVisibility}
          >
            {character.isPublic ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </Button>
          <DeleteButton onPress={handleDelete} />
        </div>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody className='gap-4'>
        <div className='w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
          <div
            className={`flex flex-row sm:flex-col items-center gap-4 ${specialElite.className}`}
          >
            <Link
              href={`/character/${character.id}/portrait`}
              className='relative w-32 h-32 rounded-full cursor-pointer overflow-hidden'
            >
              <Image
                radius='full'
                className='w-32 h-32 z-20 rounded-full object-cover'
                src={character.portrait || '/noportrait.png'}
              />
              <div
                ref={xpRef}
                className='absolute w-full h-full z-30 inset-0 rounded-full'
                style={{
                  background: 'conic-gradient(#43ff5c 0deg, white 0deg 360deg)',
                  maskImage:
                    'radial-gradient(closest-side, transparent 95%, black 0%)',
                  WebkitMaskImage:
                    'radial-gradient(closest-side, transparent 95%, black 0%)',
                }}
              ></div>
            </Link>
            <div className='flex flex-col gap-2'>
              <Chip className='text-center min-w-full pt-1'>
                Nível {xpToLevel(character.xp)}
              </Chip>
              <Chip className='text-center min-w-full pt-1'>
                {character.xp} XP
              </Chip>
            </div>
          </div>
          <div className='w-full sm:w-[calc(100%-128px)] flex flex-col mt-1 gap-4'>
            <Progress
              className={specialElite.className}
              label={`Vida: ${character.currentHp}/${character.hp}`}
              classNames={{
                indicator: 'bg-red-700',
              }}
              maxValue={character.hp}
              value={character.currentHp}
            />

            <Progress
              className={specialElite.className}
              label={`Mana: ${character.currentMp}/${character.mp}`}
              classNames={{
                indicator: 'bg-blue-700',
              }}
              maxValue={character.mp}
              value={character.currentMp}
            />

            {character.mun > 0 && (
              <div className='flex items-center gap-3 ml-1'>
                <img src='/munition.png' width={10} height={10} />
                <span className={`text-md mt-1 ${specialElite.className}`}>
                  {character.currentMun}/{character.mun}
                </span>
              </div>
            )}
            <div className='flex items-center gap-1'>
              <img src='/coin.png' width={25} height={25} />
              <span className={`text-md mt-1 ${specialElite.className}`}>
                {convertMoney(character)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardFooter>
        <Button as={Link} href={`character/${character.id}`} className='w-full'>
          Acessar Ficha
        </Button>
      </CardFooter>
    </Card>
  );
}

function Invite({
  invite,
  setInvites,
  characters,
}: {
  invite: InviteInterface;
  setInvites: React.Dispatch<React.SetStateAction<InviteInterface[]>>;
  characters: CharactersInterface[];
}) {
  const [characterId, setCharacterId] = useState<number | null>(null);

  async function handleDelete(e: FormEvent) {
    e.preventDefault();

    try {
      await api.delete(`/invites/${invite.id}`);

      toast.success('Convite deletado com sucesso');

      setInvites((invites) => invites.filter((each) => each.id !== invite.id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar convite');
    }
  }

  async function handleJoin() {
    try {
      if (!characterId) {
        toast.error('Selecione uma ficha');
        return;
      }

      await api.put(`/invites/${invite.id}`, {
        characterId,
      });

      toast.success('Personagem adicionado com sucesso');

      setInvites((invites) => invites.filter((each) => each.id !== invite.id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao adicionar personagem');
    }
  }

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <CardHeader className='h-14 justify-between'>
        <h1 className='capitalize'>Convite - {invite.session.name}</h1>

        <DeleteButton onPress={handleDelete}>
          <span className='text-danger'>Recusar</span>
        </DeleteButton>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody>
        <p>Descrição: {invite.session.description}</p>
        <p className='capitalize'>
          Jogadores:{' '}
          {invite.session.players.length && invite.session.players.join(', ')}
        </p>
      </CardBody>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardFooter className='flex justify-center items-baseline gap-3'>
        <Select
          onChange={(e) => setCharacterId(Number(e.target.value))}
          size='sm'
          placeholder='Escolher ficha'
        >
          {characters.map((char) => (
            <SelectItem key={char.id} value={char.id}>
              {char.name}
            </SelectItem>
          ))}
        </Select>
        <Button size='sm' className='w-20 sm:w-44 mt-2' onPress={handleJoin}>
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}

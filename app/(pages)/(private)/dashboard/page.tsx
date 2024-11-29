'use client';

import ModalAddCharacter from '@/components/modals/ModalAddCharacter';
import ModalAddSession from '@/components/modals/ModalAddSession';
import { specialElite } from '@/config/fonts';
import { CharacterInterface } from '@/types/character';
import { SessionInterface } from '@/types/session';
import { convertMoney } from '@/utils/convertMoney';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Progress,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [sessions, setSessions] = useState<SessionInterface[]>([]);
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      //ToDo: Implementar chamada a API

      //const sessionsResponse = await api.get('/sessions');

      //const charactersResponse = await api.get('/characters');

      //setSessions(sessionsResponse.data);

      //setCharacters(charactersResponse.data);

      setSessions([
        {
          id: 1,
          name: 'Sessão 1',
          description: 'Descrição da sessão 1',
          players: ['Player 1'],
        },
        {
          id: 2,
          name: 'Sessão 2',
          description: 'Descrição da sessão 2',
          players: ['Player 1', 'Player 2'],
        },
      ]);

      setCharacters([
        {
          id: 1,
          name: 'Personagem 1',
          pvA: 17,
          pv: 20,
          pmA: 5,
          pm: 10,
          mun: 30,
          class: 'Arcanista',
          divinity: 'Aisha',
          level: 1,
          munA: 30,
          race: 'Humano',
          to: 1,
          tp: 10,
          ts: 100,
          xp: 10,
          sessionId: 1,
          portrait:
            'https://firebasestorage.googleapis.com/v0/b/registro-paranormal.appspot.com/o/site%2Flightz%2F4%2FNaksu.png?alt=media&token=59a4d04b-990a-4d49-81d0-eebd9cbd3201',
        },
        {
          id: 2,
          name: 'Personagem 2',
          pvA: 12,
          pv: 20,
          pmA: 3,
          pm: 10,
          class: 'Arcanista',
          divinity: 'Aisha',
          level: 1,
          munA: 30,
          race: 'Humano',
          to: 1,
          mun: 30,
          tp: 10,
          ts: 100,
          xp: 10,
          portrait: null,
        },
      ]);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
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
              <SessionCard key={session.id} session={session} />
            ))}
          </Container>
          <Container title='Personagens'>
            <AddCharacterCard setCharacters={setCharacters} />
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                session={sessions.find(
                  (session) => session.id === character.sessionId
                )}
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
      <CardHeader>
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
  setCharacters: React.Dispatch<React.SetStateAction<CharacterInterface[]>>;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 border-dotted'>
      <CardHeader>
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

function SessionCard({ session }: { session: SessionInterface }) {
  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <CardHeader>
        <h1 className='capitalize'>{session.name}</h1>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody>
        <p>{session.description}</p>
        <p>Jogadores: {session.players.join(', ')}</p>
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
  session,
}: {
  character: CharacterInterface;
  session?: SessionInterface;
}) {
  const router = useRouter();

  return (
    <Card className='min-w-64 bg-transparent border-2 rounded border-gray-500 '>
      <CardHeader>
        <h1 className='capitalize'>
          {character.name}
          {session && ` - ${session?.name}`}
        </h1>
      </CardHeader>
      <Divider className='h-0.5 !bg-gray-500' />
      <CardBody className='gap-4'>
        <div className='w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
          <Image
            width={128}
            height={128}
            radius='full'
            onClick={() => router.push(`/character/${character.id}/portrait`)}
            className='aspect-square object-cover border-2 cursor-pointer'
            src={character.portrait || '/noportrait.png'}
          />
          <div className='w-full sm:w-[calc(100%-128px)] flex flex-col gap-4'>
            <Progress
              label={`PV: ${character.pvA}/${character.pv}`}
              classNames={{
                indicator: 'bg-red-700',
              }}
              maxValue={character.pv}
              value={character.pvA}
            />

            <Progress
              label={`PM: ${character.pmA}/${character.pm}`}
              classNames={{
                indicator: 'bg-blue-700',
              }}
              maxValue={character.pm}
              value={character.pmA}
            />
            <div className='flex items-center gap-1'>
              <img src='/coin.png' width={25} height={25} />
              <span className={`text-xl mt-1 ${specialElite.className}`}>
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

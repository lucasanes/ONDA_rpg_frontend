'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useSocket } from '@/app/context/SocketContext';
import { AddCharacterCard } from '@/components/AddCharacterCard';
import { AddSessionCard } from '@/components/AddSessionCard';
import { CharacterCard } from '@/components/CharacterCard';
import { Container } from '@/components/DashboardContainer';
import { InviteCard } from '@/components/InviteCard';
import { SessionCard } from '@/components/SessionCard';
import { api } from '@/providers/api';
import { CharactersInterface } from '@/types/character';
import { InviteInterface } from '@/types/invite';
import { SessionInterface } from '@/types/session';
import { Spinner } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [invites, setInvites] = useState<InviteInterface[]>([]);
  const [sessions, setSessions] = useState<SessionInterface[]>([]);
  const [characters, setCharacters] = useState<CharactersInterface[]>([]);

  const [loading, setLoading] = useState(true);

  const token = Cookies.get('token');
  const { user } = useAuth();

  const { onInvite, inviteOff } = useSocket();

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

    if (user?.id) {
      onInvite(user.id, (data) => {
        setInvites((prev) => [...prev, data]);
      });
    }

    return () => {
      inviteOff(user?.id!);
    };
  }, [user?.id]);

  return (
    <div className='w-full h-full flex flex-col items-center p-5 gap-5 overflow-y-auto'>
      {loading ? (
        <Spinner size='lg' color='current' className='mt-6' />
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
              <InviteCard
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

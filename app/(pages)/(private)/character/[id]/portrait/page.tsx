import { Metadata } from 'next';
import Portrait from './Portrait';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  const characterName = await getCharacterName(id);

  return {
    title: `Portrait ${characterName}`,
    description: `Portrait do personagem ${characterName}.`,
  };
}

async function getCharacterName(id: string): Promise<string> {
  //ToDo: Implementar chamada a API

  //const response = await api.get(`/characters/${id}`);

  const name = 'Naksu Hanna';

  const firstName = name.split(' ')[0];

  return firstName;
}

export default function Page() {
  return <Portrait />;
}

import { Metadata } from 'next';
import Portrait from './Character';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  const characterName = await getCharacterName(id);

  return {
    title: `${characterName}`,
    description: `Ficha do personagem ${characterName}.`,
  };
}

async function getCharacterName(id: string): Promise<string> {
  //ToDo: Implementar chamada a API

  //const response = await api.get(`/characters/${id}`);

  const name = 'Naksu Hanna';

  return name;
}

export default function Page() {
  return <Portrait />;
}

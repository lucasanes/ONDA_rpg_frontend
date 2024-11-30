import { Metadata } from 'next';
import Session from './Session';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  const sessionName = await getSessionName(id);

  return {
    title: `${sessionName}`,
    description: `Painel do Meste da Campanha ${sessionName}.`,
  };
}

async function getSessionName(id: string): Promise<string> {
  //ToDo: Implementar chamada a API

  //const response = await api.get(`/sessions/${id}`);

  const name = 'ONDA';

  return name;
}

export default function Page() {
  return <Session />;
}

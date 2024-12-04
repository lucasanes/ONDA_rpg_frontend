import { specialElite } from '@/config/fonts';
import { api } from '@/providers/api';
import { CharactersInterface } from '@/types/character';
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
  Link,
  Progress,
} from '@nextui-org/react';
import { FormEvent, useEffect, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';

export function CharacterCard({
  character,
  setCharacters,
}: {
  character: CharactersInterface;
  setCharacters: React.Dispatch<React.SetStateAction<CharactersInterface[]>>;
}) {
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
                className='w-full h-full z-20 aspect-square rounded-full object-cover'
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

import { useSocket } from '@/app/context/SocketContext';
import { specialElite } from '@/config/fonts';
import { api } from '@/providers/api';
import { SessionCharactersInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { xpToLevel, xpToNextLevel } from '@/utils/xp-level';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link,
  Progress,
} from '@nextui-org/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLinkExternal, BiUnlink, BiUserCircle } from 'react-icons/bi';
import { GiShardSword } from 'react-icons/gi';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';

export function SessionCharacterCard({
  initialCharacter,
  setCharacters,
}: {
  initialCharacter: SessionCharactersInterface;
  setCharacters: React.Dispatch<
    React.SetStateAction<SessionCharactersInterface[]>
  >;
}) {
  const [character, setCharacter] = useState(initialCharacter);

  const {
    id,
    isPublic,
    mainCharacter: {
      age,
      class: characterClass,
      origin,
      divinity,
      name,
      race,
      weightLimit,
      to,
      tc,
      tp,
      xp,
    },
    statusCharacter: {
      cd,
      mun,
      currentMun,
      dying,
      fighting,
      hurted,
      tired,
      unconscious,
      mp,
      currentMp,
      money,
      portrait,
      hp,
      currentHp,
      defense,
    },
  } = character;

  const [section, setSection] = useState<'main' | 'status'>('status');
  const xpRef = useRef<HTMLDivElement>(null);

  const {
    onStatusCharacter,
    emitStatusCharacter,
    statusCharacterOff,
    onXPCharacter,
    xpCharacterOff,
  } = useSocket();

  function updateXP(currentXP: number) {
    setCharacter((prev) => {
      return {
        ...prev,
        mainCharacter: {
          ...prev.mainCharacter,
          xp: currentXP,
        },
      };
    });

    const xpProgressRef = xpRef.current;

    if (!xpProgressRef) return;

    const quantityXPOfCurrentLevel = xpToNextLevel(xpToLevel(currentXP));
    const quantityXPToNextLevel = xpToNextLevel(xpToLevel(currentXP) + 1);

    const percentage =
      ((currentXP - quantityXPOfCurrentLevel) /
        (quantityXPToNextLevel - quantityXPOfCurrentLevel)) *
      100;

    const degree = (percentage / 100) * 360;
    xpProgressRef.style.background = `conic-gradient(#43ff5c 0deg ${degree}deg, white ${degree}deg 360deg)`;
  }

  useEffect(() => {
    updateXP(xp);

    onStatusCharacter(Number(id), (data) => {
      setCharacter((prev) => {
        return {
          ...prev,
          statusCharacter: {
            ...prev.statusCharacter,
            [data.key]: data.value,
          },
        };
      });
    });

    onXPCharacter(Number(id), (data) => {
      updateXP(data.xp);
    });

    return () => {
      statusCharacterOff(Number(id));
      xpCharacterOff(Number(id));
    };
  }, []);

  function handleChangeFighting() {
    emitStatusCharacter(
      {
        characterId: id,
        key: 'fighting',
        value: !fighting,
      },
      () => {
        setCharacter((prev) => {
          return {
            ...prev,
            statusCharacter: {
              ...prev.statusCharacter,
              fighting: !prev.statusCharacter.fighting,
            },
          };
        });
      }
    );
  }

  async function handleChangeVisibility() {
    try {
      await api.put(`/characters/${character.id}`, {
        isPublic: !character.isPublic,
      });

      setCharacter((prev) => {
        return {
          ...prev,
          isPublic: !prev.isPublic,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao alterar visibilidade');
    }
  }

  async function handleUnlink(e: FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/characters/${id}`, {
        sessionId: null,
      });

      toast.success('Personagem desvinculado com sucesso');

      setCharacters((prev) => prev.filter((each) => each.id !== id));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao desvincular personagem');
    }
  }

  const buttonMainActive = section == 'main' ? 'secondary' : 'default';
  const buttonStatusActive = section == 'status' ? 'secondary' : 'default';

  return (
    <Card className='bg-transparent border-2 border-gray-300 rounded-sm'>
      <CardHeader className='justify-between items-center gap-4'>
        <div className='flex justify-center items-center gap-2'>
          <h1 className='w-min sm:w-fit text-lg capitalize'>{name}</h1>
          <Button
            as={Link}
            href={`/character/${id}`}
            size='sm'
            variant='light'
            className='text-blue-500 min-w-1'
          >
            <BiLinkExternal size={18} />
          </Button>
        </div>

        <div className='flex flex-wrap justify-center gap-2'>
          <Button
            as={Link}
            href={`/character/${id}/portrait`}
            size='sm'
            variant='light'
            className='text-cyan-500 min-w-1'
          >
            <BiUserCircle size={20} />
          </Button>
          <Button
            size='sm'
            variant='light'
            className={`${fighting ? 'text-green-500' : 'text-danger'} min-w-1`}
            onPress={handleChangeFighting}
          >
            <GiShardSword size={20} />
          </Button>
          <Button
            size='sm'
            className={`min-w-1 ${isPublic ? 'text-green-500' : 'text-danger'}`}
            variant='light'
            onPress={handleChangeVisibility}
          >
            {isPublic ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </Button>
          <DeleteButton onPress={handleUnlink}>
            <BiUnlink className='text-danger' size={19} />
          </DeleteButton>
        </div>
      </CardHeader>
      <Divider className='h-0.5 bg-gray-300' />
      <CardHeader className='justify-center items-center gap-3'>
        <Button color={buttonMainActive} onPress={() => setSection('main')}>
          Principal
        </Button>
        <Button color={buttonStatusActive} onPress={() => setSection('status')}>
          Status
        </Button>
      </CardHeader>
      <Divider className='h-0.5 bg-gray-300' />
      <CardBody
        className={`${section != 'main' ? 'hidden' : 'grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
      >
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Nome'
          value={name}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Level'
          value={xpToLevel(xp).toString()}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='XP'
          value={xp.toString()}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Idade'
          value={age.toString()}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Classe'
          value={characterClass}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Raça'
          value={race}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Origem'
          value={origin}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Divindade'
          value={divinity}
        />
        <Input
          variant='bordered'
          size='md'
          disabled
          label='Limite de Peso'
          value={weightLimit.toString()}
        />

        <div className='flex flex-wrap justify-center items-center col-span-full mt-3 px-3 gap-3'>
          <Chip>{`Defesa (CA): ${defense}`}</Chip>
          <Chip>{`Classe de Dificuldade (CD): ${cd}`}</Chip>
        </div>
      </CardBody>

      <CardBody className={`gap-4 ${section != 'status' ? 'hidden' : ''}`}>
        <div className='w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
          <div
            className={`flex flex-row sm:flex-col items-center gap-4 ${specialElite.className}`}
          >
            <Link
              href={`/character/${id}/portrait`}
              className='relative min-w-32 min-h-32 max-w-32 max-h-32 rounded-full cursor-pointer'
            >
              <img
                style={{
                  width: 175,
                  height: 175,
                }}
                src='/blood2.png'
                className={`absolute z-20 -bottom-6 right-2 rounded-full rotate-90 transition duration-700 ease-in-out ${dying ? 'opacity-90' : 'opacity-0'} ${unconscious ? 'blur-sm' : ''}`}
              />
              <img
                style={{
                  width: 125,
                  height: 125,
                }}
                src='/blood1.png'
                className={`absolute z-20 left-2 rounded-full rotate-90 transition duration-700 ease-in-out ${hurted ? 'opacity-90' : `opacity-0`} ${unconscious ? 'blur-sm' : ''}`}
              />
              <img
                className={`z-0 w-32 h-32 rounded-full aspect-square object-cover transition duration-700 ease-in-out ${unconscious ? 'brightness-0 blur-sm' : 'brightness-100 blur-0'} ${tired ? 'grayscale' : ''}`}
                src={portrait || '/noportrait.png'}
              />
              <div
                ref={xpRef}
                className='absolute w-32 h-32 z-30 inset-0 rounded-full'
                style={{
                  background: 'conic-gradient(#43ff5c 0deg, white 0deg 360deg)',
                  maskImage:
                    'radial-gradient(closest-side, transparent 97%, black 0%)',
                  WebkitMaskImage:
                    'radial-gradient(closest-side, transparent 97%, black 0%)',
                }}
              ></div>
            </Link>
            <div className='flex flex-col gap-2'>
              <Chip className='text-center min-w-full pt-1'>
                Nível {xpToLevel(xp)}
              </Chip>
              <Chip className='text-center min-w-full pt-1'>{xp} XP</Chip>
            </div>
          </div>
          <div className='w-full sm:w-[calc(100%-128px)] flex flex-col mt-1 gap-4'>
            <Progress
              className={specialElite.className}
              label={`Vida: ${currentHp}/${hp}`}
              classNames={{
                indicator: 'bg-red-700',
              }}
              maxValue={hp}
              value={currentHp}
            />

            <Progress
              className={specialElite.className}
              label={`Mana: ${currentMp}/${mp}`}
              classNames={{
                indicator: 'bg-blue-700',
              }}
              maxValue={mp}
              value={currentMp}
            />

            <div className='flex items-center gap-3 ml-1'>
              <img src='/munition.png' width={10} height={10} />
              <span className={`text-md mt-1 ${specialElite.className}`}>
                {mun > 0 ? `${currentMun}/${mun}` : '0'}
              </span>
            </div>

            <div className='flex items-center gap-1'>
              <img src='/coin.png' width={25} height={25} />
              <span className={`text-md mt-1 ${specialElite.className}`}>
                {money ? money : convertMoney(character.mainCharacter)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

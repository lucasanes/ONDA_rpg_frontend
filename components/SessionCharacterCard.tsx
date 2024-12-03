import { specialElite } from '@/config/fonts';
import { SessionCharactersInterface } from '@/types/character';
import { convertMoney } from '@/utils/convertMoney';
import { xpToLevel } from '@/utils/xp-level';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Link,
  Progress,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiCoin, BiLinkExternal, BiUnlink, BiUserCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';

export function SessionCharacterCard({
  character,
  setCharacters,
}: {
  character: SessionCharactersInterface;
  setCharacters: React.Dispatch<
    React.SetStateAction<SessionCharactersInterface[]>
  >;
}) {
  const {
    age,
    cd,
    class: characterClass,
    origin,
    defense,
    divinity,
    id,
    isPublic,
    mun,
    currentMun,
    name,
    mp,
    currentMp,
    portrait,
    hp,
    currentHp,
    race,
    to,
    tp,
    ts,
    xp,
  } = character;

  const router = useRouter();

  const [section, setSection] = useState<'main' | 'status'>('main');
  const xpRef = useRef<HTMLDivElement>(null);

  async function handleChangeVisibility() {
    try {
      //ToDo: Implementar chamada a API

      //await api.put(`/characters/${character.id}`, {
      //  isPublic: !character.isPublic,
      //});

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

  async function handleUnlink() {
    try {
      //ToDo: Implementar chamada a API

      // await api.put(`/characters/${id}`, {
      //   sessionId: null,
      // });

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
      <CardHeader className='justify-between items-center'>
        <div className='flex justify-center items-center gap-2'>
          <h1 className='w-min sm:w-fit text-lg'>{name}</h1>
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

        <div className='flex gap-2'>
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
      {section == 'main' && (
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
            startContent={<BiCoin className='mb-0.5' />}
            variant='bordered'
            size='md'
            disabled
            label='$ TS $'
            value={ts.toString()}
          />
          <Input
            startContent={<BiCoin className='mb-0.5' />}
            variant='bordered'
            size='md'
            disabled
            label='$ TP $'
            value={tp.toString()}
          />
          <Input
            startContent={<BiCoin className='mb-0.5' />}
            variant='bordered'
            size='md'
            disabled
            label='$ TO $'
            value={to.toString()}
          />

          <div className='flex flex-wrap justify-center items-center col-span-full mt-3 px-3 gap-3'>
            {defense && <Chip>{`Defesa (CA): ${defense}`}</Chip>}
            {cd && <Chip>{`Classe de Dificuldade (CD): ${cd}`}</Chip>}

            <div className='flex justify-center items-center gap-1'>
              <img src='/coin.png' width={25} height={25} />
              <span className={`text-xl mt-1 ${specialElite.className}`}>
                {convertMoney(character)}
              </span>
            </div>
          </div>
        </CardBody>
      )}

      {section == 'status' && (
        <CardBody className='gap-4'>
          <div className='w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
            <div
              className={`flex flex-row sm:flex-col items-center gap-4 ${specialElite.className}`}
            >
              <div
                onClick={() => router.push(`/character/${id}/portrait`)}
                className='relative w-32 h-32 rounded-full cursor-pointer overflow-hidden'
              >
                <Image
                  radius='full'
                  className='w-full h-full z-20 rounded-full object-cover'
                  src={portrait || '/noportrait.png'}
                />
                <div
                  ref={xpRef}
                  className='absolute z-30 inset-0 rounded-full'
                  style={{
                    background:
                      'conic-gradient(#43ff5c 0deg, white 0deg 360deg)',
                    maskImage:
                      'radial-gradient(closest-side, transparent 95%, black 0%)',
                    WebkitMaskImage:
                      'radial-gradient(closest-side, transparent 95%, black 0%)',
                  }}
                ></div>

                {/* <div className='absolute z-20 inset-0 rounded-full border-2 border-white'></div> */}
              </div>
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

              {mun && (
                <div className='flex items-center gap-3 ml-1'>
                  <img src='/munition.png' width={10} height={10} />
                  <span className={`text-md mt-1 ${specialElite.className}`}>
                    {currentMun}/{mun}
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
      )}
    </Card>
  );
}

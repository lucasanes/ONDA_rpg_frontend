import { useSocket } from '@/app/context/SocketContext';
import { storage } from '@/firebase.config';
import { Button, Divider, Spinner, useDisclosure } from '@nextui-org/react';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ListResult,
  ref,
  StorageReference,
} from 'firebase/storage';
import { FormEvent, useEffect, useState } from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { TbPlayerPlay } from 'react-icons/tb';
import AddButton from './AddButton';
import { ModalAddSound } from './modals/ModalAddSound';
import ModalDelete from './modals/ModalDelete';
import { SoundControl } from './SoundControl';

interface FolderData {
  name: string;
  items: StorageReference[];
  prefixes: FolderData[];
}

type FolderOpened = FolderData | null;
type ItemOpened = StorageReference | null;

export function SoundContainer({
  userIds,
}: {
  userIds: number[];
}): JSX.Element {
  const [prevFolder, setPrevFolder] = useState<FolderData[]>([]);
  const [folderOpened, setFolderOpened] = useState<FolderOpened>(null);
  const [itemOpened, setItemOpened] = useState<ItemOpened>(null);
  const [path, setPath] = useState<string>('sounds');
  const [openedIndex, setOpenedIndex] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const { emitAudioPause, emitAudioPlay } = useSocket();

  const prod = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

  async function fetchData(): Promise<void> {
    setLoading(true);

    setItemOpened(null);
    setAudioUrl(null);

    try {
      const getFoldersRef = ref(
        storage,
        `novosite/${prod ? 'prod' : 'dev'}/sounds`
      );
      const response = await fetchFoldersAndFiles(getFoldersRef);

      if (path !== 'sounds') {
        const currentFolder = currentFolderOpened(response);
        setFolderOpened(currentFolder);
      } else {
        setFolderOpened(response);
      }
    } catch (e) {
      console.error('Erro ao buscar os arquivos:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const currentFolderOpened = (response: FolderData): FolderOpened => {
    const pathArray = path.split(' > ').slice(1);

    if (pathArray.length === 1) {
      setPrevFolder([response]);
      return (
        response.prefixes.find((folder) => folder.name === pathArray[0]) || null
      );
    }

    const firstFolderData = response.prefixes.find(
      (folder) => folder.name === pathArray[0]
    );
    if (!firstFolderData) return null;

    setPrevFolder([response, firstFolderData]);
    return firstFolderData.prefixes[0] || null;
  };

  const fetchFoldersAndFiles = async (
    folderRef: StorageReference
  ): Promise<FolderData> => {
    const response: ListResult = await listAll(folderRef);
    const folderData: FolderData = {
      name: folderRef.name,
      items: response.items,
      prefixes: [],
    };

    for (const prefix of response.prefixes) {
      const childFolderData = await fetchFoldersAndFiles(prefix);
      folderData.prefixes.push(childFolderData);
    }

    return folderData;
  };

  const handleOpenFolder = (to: 'prev' | 'next', folder: FolderData): void => {
    if (to === 'prev') {
      setOpenedIndex(openedIndex - 1);
      setPath(path.split(' > ').slice(0, -1).join(' > '));
      setFolderOpened(prevFolder[openedIndex - 1] || null);
      setPrevFolder((prev) => prev.slice(0, -1));
    }

    if (to === 'next') {
      setOpenedIndex(openedIndex + 1);
      setPath(`${path} > ${folder.name}`);
      setPrevFolder((prev) => [...prev, folderOpened!]);
      setFolderOpened(folder);
    }
  };

  const handleOpenItem = async (item: StorageReference): Promise<void> => {
    if (itemOpened && itemOpened.name === item.name) {
      setItemOpened(null);
      setAudioUrl(null);

      userIds.forEach((id) => {
        emitAudioPause({
          userId: Number(id),
          audioUrl: audioUrl || '',
          currentTime: 0,
        });
      });
      return;
    }

    setItemOpened(item);
    const url = await getDownloadURL(ref(storage, item.fullPath));
    setAudioUrl(url);

    userIds.forEach((id) => {
      emitAudioPlay({ userId: Number(id), audioUrl: url, currentTime: 0 });
    });

    if (itemOpened && itemOpened.name !== item.name) {
      userIds.forEach((id) => {
        emitAudioPlay({ userId: Number(id), audioUrl: url, currentTime: 0 });
      });
    }
  };

  const deleteFile = async (
    e: FormEvent,
    item: StorageReference
  ): Promise<void> => {
    e.preventDefault();

    const fileRef = ref(storage, item.fullPath);

    try {
      await deleteObject(fileRef);
      fetchData();
    } catch (error) {
      console.error('Erro ao deletar o arquivo:', error);
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    onDeleteOpen();
  };

  const cleanPath = path.replace(' > ', '/');

  return (
    <div className='border-2 rounded-md border-gray-300 flex flex-col p-4 gap-2 overflow-x-hidden'>
      <ModalAddSound
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        currentPath={cleanPath}
        fetchData={fetchData}
      />

      <div className='h-10 flex justify-between items-center'>
        <h1 className='text-xl pt-1'>Soundpad</h1>
        <AddButton onPress={onOpen} />
      </div>

      <Divider className='bg-gray-300 -ml-4 mt-2 mb-2 h-0.5 w-[calc(100%+2rem)]' />

      <div className='w-full flex flex-col justify-center items-start'>
        {loading ? (
          <Spinner size='lg' className='mx-auto' />
        ) : (
          <>
            <SoundControl
              userIds={userIds}
              key={audioUrl || 'default'}
              audioUrl={audioUrl || ''}
            />

            <h1 className='mt-8 mb-2 text-lg capitalize'>
              {path} {itemOpened ? ` > ${itemOpened.name}.mp3` : null}
            </h1>
          </>
        )}

        <div className='w-full grid grid-cols-[repeat(auto-fit,_minmax(150px,0.5fr))] gap-2 items-stretch'>
          {folderOpened && folderOpened.name !== 'sounds' && (
            <Button
              className='min-w-0 w-full h-full pb-2 flex flex-col justify-between'
              onPress={() => handleOpenFolder('prev', folderOpened)}
            >
              <FcOpenedFolder size={50} />
              <p>Voltar</p>
            </Button>
          )}

          {folderOpened?.prefixes &&
            folderOpened.prefixes.map((folder, i) => (
              <Button
                className='min-w-0 w-full h-full pb-2 flex flex-col justify-between'
                key={i}
                onPress={() => handleOpenFolder('next', folder)}
              >
                <FcOpenedFolder size={50} />
                <p className='capitalize'>{folder.name}</p>
              </Button>
            ))}

          {folderOpened?.items &&
            folderOpened.items.map((item, i) => (
              <div key={i} className='h-full'>
                <ModalDelete
                  onPress={(e) => deleteFile(e, item)}
                  isOpen={deleteIsOpen}
                  onClose={onDeleteClose}
                  onOpenChange={onDeleteOpenChange}
                />
                <Button
                  className='min-w-0 w-full h-full pb-2 flex flex-col justify-between'
                  onPress={() => handleOpenItem(item)}
                  onContextMenu={handleContextMenu}
                >
                  <TbPlayerPlay color='#2C7A7B' size={50} />
                  <span className='capitalize text-white text-wrap'>
                    {item.name}
                  </span>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

import { useAuth } from '@/app/context/AuthContext';
import { storage } from '@/firebase.config';
import { Input } from '@nextui-org/input';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function FileInput({
  label,
  placeholder,
  value,
  setValue,
  ...rest
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentPropsWithoutRef<typeof Input>) {
  const { user } = useAuth();

  const params = useParams();

  const { id } = params;

  const prod = process.env.NODE_ENV === 'production';

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `novosite/${prod ? 'prod' : 'dev'}/${user?.username || 'unknow'}/${id || 'unknow'}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    toast.info('Aguarde...');

    uploadTask.on(
      'state_changed',
      (infos) => {
        console.log('Enviando arquivo...', infos);
      },
      (err) => {
        console.log('Erro ao enviar arquivo', err);
        toast.error('Erro ao enviar arquivo');
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setValue(downloadURL);
        } catch (err) {
          toast.error('Erro ao adquirir link do arquivo');
          console.log(err);
        } finally {
          toast.success('Arquivo enviado com sucesso');
        }
      }
    );
  }

  return (
    <Input
      {...rest}
      label={label}
      labelPlacement='outside'
      placeholder={placeholder}
      type='url'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      endContent={
        <label className='h-10 flex items-center border-l-white border-l-2 pl-2 cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <span className='text-sm whitespace-nowrap'>Enviar Arquivo</span>
        </label>
      }
    />
  );
}

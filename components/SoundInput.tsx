import { storage } from '@/firebase.config';
import { Input } from '@nextui-org/input';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

export default function SoundInput({
  label,
  placeholder,
  path,
  fileName,
  value,
  setValue,
  ...rest
}: {
  label: string;
  placeholder: string;
  path: string;
  fileName: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentPropsWithoutRef<typeof Input>) {
  const prod = process.env.NODE_ENV === 'production';

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `novosite/${prod ? 'prod' : 'dev'}/${path}/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    toast.info('Aguarde...');

    uploadTask.on(
      'state_changed',
      (infos) => {
        console.log('Enviando som...', infos);
      },
      (err) => {
        console.log('Erro ao enviar som', err);
        toast.error('Erro ao enviar som');
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setValue(downloadURL);
        } catch (err) {
          toast.error('Erro ao adquirir link do som');
          console.log(err);
        } finally {
          toast.success('Som enviado com sucesso');
        }
      }
    );
  }

  return (
    <Input
      {...rest}
      required
      isRequired
      label={label}
      labelPlacement='outside'
      placeholder={placeholder}
      type='url'
      disabled
      value={value}
      onChange={(e) => setValue(e.target.value)}
      endContent={
        <label className='h-10 flex items-center border-l-white border-l-2 pl-2 cursor-pointer'>
          <input
            type='file'
            accept='audio/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <span className='text-sm whitespace-nowrap'>Enviar Som</span>
        </label>
      }
    />
  );
}

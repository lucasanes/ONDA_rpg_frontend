import { Divider } from '@nextui-org/react';

export function Container({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='w-full flex flex-col border-2 rounded-md border-gray-300'>
      <h1 className='m-3 text-lg text-center'>{title}</h1>
      <Divider className='h-0.5 !bg-gray-300' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3 gap-6'>
        {children}
      </div>
    </div>
  );
}

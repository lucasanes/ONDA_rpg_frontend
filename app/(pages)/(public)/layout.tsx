'use client';

import '@/styles/globals.css';
import React from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='fixed w-full h-full flex flex-col'>{children}</div>;
}

import '@/styles/globals.css';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Painel',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

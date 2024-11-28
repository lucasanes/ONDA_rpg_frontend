import '@/styles/globals.css';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Portrait',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

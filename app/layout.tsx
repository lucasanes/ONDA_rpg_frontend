import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';

import { Providers } from './providers';

import { poppins } from '@/config/fonts';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`dark ${poppins.className}`}
      lang='pt-BR'
    >
      <body className='bg-background'>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

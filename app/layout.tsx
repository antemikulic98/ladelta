import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'LaDelta — torte, kolači i slastice',
  description:
    'LaDelta je hrvatski brend koji proizvodi torte, kolače i slastice — ručna izrada, vrhunski sastojci.',
  metadataBase: new URL('https://ladelta.example'),
  openGraph: {
    title: 'LaDelta — torte, kolači i slastice',
    description:
      'Hrvatski brend slastica: torte, kolači i keksi ručno rađeni s pažnjom.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='hr'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

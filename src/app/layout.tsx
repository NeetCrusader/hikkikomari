import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import OverlayWrapper from '@/components/OverlayWrapper';
import DynamicTitleUpdater from '@/components/DynamicTitleUpdater';
import RegisterVisit from '@/components/RegisterVisit';
import { Analytics } from '@vercel/analytics/next';
import '@/lib/fontawesome';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'hi!!!',
    template: '%s',
  },
  description: ' ͝ ꒡⠀† ݁  ⏝∔⏝  ݁ †⠀꒡ ͝',
  metadataBase: new URL('https://hikkikomari.lol'),
  openGraph: {
    title: 'hi!!!',
    description: ' ͝ ꒡⠀† ݁  ⏝∔⏝  ݁ †⠀꒡ ͝',
    siteName: 'neeurotica',
    type: 'website',
  },
  themeColor: '#ffffff',
  other: {
    'msapplication-TileColor': '#191919',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans subpixel-antialiased`}>
        <Analytics />
        <RegisterVisit />
        <OverlayWrapper>
          <DynamicTitleUpdater />
          {children}
        </OverlayWrapper>
      </body>
    </html>
  );
}

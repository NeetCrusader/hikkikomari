import { Inter } from 'next/font/google';
import OverlayWrapper from '@/components/OverlayWrapper';
import DynamicTitleUpdater from '@/components/DynamicTitleUpdater';
import { metadata } from 'amphibian-seo';
import '@/lib/fontawesome';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const generateMetadata = () => {
  return metadata({
    title: {
      default: 'hi!!!',
      template: '%title%',
    },
    canonicalUrl: 'https://hikkikomari.lol',
    description: ' ͝ ꒡⠀† ݁  ⏝∔⏝  ݁ †⠀꒡ ͝',
    openGraph: {
      title: 'hi!!!',
      description: ' ͝ ꒡⠀† ݁  ⏝∔⏝  ݁ †⠀꒡ ͝',
      siteName: 'neeurotica',
    },
    mobileApp: {
      themeColor: '#ffffff',
      msapplicationTileColor: '#191919',
    },
    securityMetaTags: [
      { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'" },
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    ],
  });
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans subpixel-antialiased`}>
        <OverlayWrapper>
          <DynamicTitleUpdater />
          {children}
        </OverlayWrapper>
      </body>
    </html>
  );
}

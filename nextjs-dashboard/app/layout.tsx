import '@/app/ui/global.css';
import type { Metadata, Viewport } from 'next';
import { arcadeBody, arcadeHeading } from '@/app/ui/fonts';
import ThemeSwitcher from '@/app/ui/theme-switcher';

export const metadata: Metadata = {
  title: 'Focus Utility Deck',
  description:
    'A daily-use toolkit with focus timers and practical mini apps.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Focus Utility Deck',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  themeColor: '#041a16',
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${arcadeBody.variable} ${arcadeHeading.variable} antialiased`}>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}

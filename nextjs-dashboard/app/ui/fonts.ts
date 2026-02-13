import { Inter, Lusitana, Orbitron, Share_Tech_Mono } from 'next/font/google';

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
 
export const inter = Inter({ subsets: ['latin'] });

export const arcadeHeading = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-arcade-heading',
});

export const arcadeBody = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-arcade-body',
});

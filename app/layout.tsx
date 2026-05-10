import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aarav & Meera Wedding',
  description: 'A cinematic wedding invitation website.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="noise">{children}</body></html>;
}

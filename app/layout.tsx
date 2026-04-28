import type { Metadata } from 'next';
import { Libre_Baskerville, Lato } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Ridgebound | Thru-Hiking Concierge',
  description: 'Precision logistics for the great unknown. We handle the paperwork, you handle the miles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${lato.variable}`}>
      <body className="bg-[#F4ECD8] text-[#4A3728] font-body min-h-screen relative overflow-x-hidden">
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
        {children}
      </body>
    </html>
  );
}

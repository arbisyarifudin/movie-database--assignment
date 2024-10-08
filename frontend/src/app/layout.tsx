import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Bottom } from '@/components/pages/Bottom';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Movie Database',
    description: 'A simple movie database',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <main className="w-full h-screen md:max-w-8xl mx-auto relative z-10">
                    {children}
                </main>
                <Bottom />
                <Toaster />
            </body>
        </html>
    );
}

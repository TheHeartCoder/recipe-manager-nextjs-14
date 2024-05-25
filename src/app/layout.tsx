import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Food Recipe App',
    description: 'Developed by the heart coder'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <div className='min-h-screen bg-gray-100'>
                        <Header />
                        {children}
                        <footer className='bg-gray-800 text-white py-4'>
                            <div className='container mx-auto text-center'>
                                <p>
                                    © 2024 Recipe Manager. All rights reserved.
                                </p>
                            </div>
                        </footer>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}

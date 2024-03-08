// import { Inter } from 'next/font/google';
import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import localFont from 'next/font/local';
import './globals.css';

const segoe_ui = localFont({
    src: [
        {
            path: '../font/SegoeUI.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../font/SegoeUIItalic.woff',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../font/SegoeUIBold.woff',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../font/SegoeUIBoldItalic.woff',
            weight: '700',
            style: 'italic',
        },
    ],
    display: 'swap',
    variable: '--font-segoe-ui',
});

export const metadata = {
    title: 'Jackson Porciúncula',
    description: "Jackson Porciúncula's Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br" className={`${segoe_ui.variable}`}>
            <body className="flex h-screen w-full flex-col items-center justify-between">
                <NavBar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/jplogo.svg';

const routes = ['Trabalhos', 'Blog', 'Sobre'];

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = (styles) => {
        return (
            <ul className={styles}>
                {routes.map((routeName) => {
                    const normalizedPathName =
                        routeName === 'Trabalhos'
                            ? '/'
                            : routeName.toLocaleLowerCase();

                    return (
                        <li key={routeName}>
                            <Link
                                legacyBehavior
                                className={`link ${pathname === normalizedPathName ? 'active' : ''}`}
                                href={normalizedPathName}
                            >
                                <a
                                    className="animate-fade delay-50 font-bold text-primary-gray-darkest transition duration-150 hover:text-secondary-gray-dark"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {routeName}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            <nav className="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-12">
                <div className="flex items-center">
                    <Image
                        priority
                        src={Logo}
                        alt="Logo"
                        height={72}
                        width={72}
                    />
                    <h1 className="ml-4 max-sm:hidden">
                        User Experience Designer
                    </h1>
                </div>
                {navItems('flex space-x-12 max-sm:hidden')}
                <div className="mt-2 flex sm:hidden">
                    {!isOpen ? (
                        <div
                            className="float-right space-y-1 text-xl text-primary-gray-darkest"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <FiMenu />
                        </div>
                    ) : (
                        <div
                            className="float-right space-y-1 text-xl text-primary-gray-darkest"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiX />
                        </div>
                    )}
                </div>
            </nav>
            <div
                class={
                    isOpen
                        ? 'bg-white z-10 w-full max-w-sm rounded-lg shadow sm:hidden'
                        : 'hidden'
                }
            >
                {navItems('flex min-h-32 justify-around flex-col items-center')}
            </div>
        </>
    );
}

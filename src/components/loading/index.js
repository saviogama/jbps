'use client';

import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/jplogo.svg';

export default function Loading() {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShowing(!isShowing);
        }, 600);

        return () => clearInterval(interval);
    }, [isShowing]);

    return (
        <div className="h-full">
            <Transition show={isShowing} className="flex items-center py-16">
                <Transition.Child
                    as={Fragment}
                    appear
                    enter="transform transition duration-[400ms]"
                    enterFrom="opacity-0 rotate-[-120deg] scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <Image
                        priority
                        src={Logo}
                        alt="Logo"
                        height={48}
                        width={48}
                    />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    appear
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <span className="ml-2 text-primary-gray-dark">
                        Carregando...
                    </span>
                </Transition.Child>
            </Transition>
        </div>
    );
}

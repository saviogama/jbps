'use client';

import { useEffectSafe } from '@/hooks/useEffectSafe';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { FiMail, FiDownload } from 'react-icons/fi';
import Loading from '@/components/loading';
import Link from 'next/link';

export default function About() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const router = useRouter();

    useEffectSafe(() => {
        fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jacksonporciuncula'
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data?.feed);
                setLoading(false);
            });
    }, []);

    return (
        <main className="container mx-auto flex flex-col">
            {!isLoading ? (
                <Transition
                    show
                    appear
                    as={Fragment}
                    enter="ease-out duration-700 delay-300"
                    enterFrom="opacity-0 scale-75"
                    enterTo="opacity-100 scale-100"
                >
                    <div className="mx-4 my-4 flex max-w-screen-lg items-center justify-center max-sm:my-8 max-sm:flex-col">
                        <img
                            className="my-4 rounded-full"
                            src={data.image}
                            alt={data.author}
                        />
                        <div className="mx-8">
                            <h1 className="text-2xl font-bold max-sm:text-center">
                                Jackson Porciúncula
                            </h1>
                            <h2 className="my-6">
                                Seja bem-vindo(a) ao meu portfólio. Se você
                                estiver procurando por trabalhos recentes, por
                                favor confira a aba de Trabalhos.
                            </h2>
                            <span>
                                The world is constantly evolving thanks to
                                designers centering their process around the
                                user. Creatives design an experience through a
                                series of touch-points that form the framework
                                to have a meaningful interaction. It starts with
                                understanding what the user needs, and ideating
                                an innovative solution to fulfill it.
                            </span>
                            <div className="mt-4 flex max-sm:float-right">
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            'mailto:jbrunops@outlook.com'
                                        )
                                    }
                                    className="animate-fade delay-50 mr-4 flex items-center rounded-lg border-2 border-primary-gray-darkest px-4 py-2 text-primary-gray-darkest transition duration-150 hover:bg-primary-gray-darkest hover:text-primary-white max-sm:px-2 max-sm:py-1"
                                >
                                    <FiMail className="mr-1" />
                                    E-mail
                                </button>
                                <Link
                                    href="/docs/Jackson_Porciuncula_Resume.pdf"
                                    target="_blank"
                                    locale={false}
                                    className="animate-fade delay-50 flex items-center rounded-lg border-2 border-primary-gray-darkest px-4 py-2 text-primary-gray-darkest transition duration-150 hover:bg-primary-gray-darkest hover:text-primary-white max-sm:px-2 max-sm:py-1"
                                >
                                    <FiDownload className="mr-1" />
                                    Currículo
                                </Link>
                            </div>
                        </div>
                    </div>
                </Transition>
            ) : (
                <Loading />
            )}
        </main>
    );
}

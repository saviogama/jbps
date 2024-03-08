'use client';

import { Fragment, useState } from 'react';
import { useEffectSafe } from '@/hooks/useEffectSafe';
import { enhanceItemsThumbnail } from '@/helpers/dataParser';
import { Transition } from '@headlessui/react';
import { Modal } from '@/components/modal';
import Loading from '@/components/loading';
import parse from 'html-react-parser';

export default function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalShown, setModalVisibility] = useState(false);
    const [modalContent, setModalContent] = useState(false);

    const setModal = (content) => {
        setModalContent(content);
        setModalVisibility(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeModal = () => {
        setModalVisibility(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffectSafe(() => {
        fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jacksonporciuncula'
        )
            .then((res) => res.json())
            .then((data) => {
                const enhancedItems = enhanceItemsThumbnail(data);
                const filteredItemsBasedOnCategory = enhancedItems.filter((e) =>
                    e.categories.includes('trabalho')
                );

                setData({ ...data, items: filteredItemsBasedOnCategory });
                setLoading(false);
            });
    }, []);

    return (
        <main className="container mx-auto">
            {isModalShown ? (
                <Modal close={closeModal}>{parse(modalContent)}</Modal>
            ) : (
                <>
                    <Transition
                        as={Fragment}
                        show
                        appear
                        enter="transition-opacity duration-1000 delay-150"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        <h1 className="mx-52 my-20 text-center text-6xl font-bold text-primary-gray-darkest max-md:my-10 max-md:text-4xl max-sm:mx-4 max-sm:text-2xl">
                            Experiências que conectam, mudam e inspiram.
                        </h1>
                    </Transition>
                    <section className="mx-12 mb-10 max-md:mb-5">
                        <Transition
                            show
                            appear
                            className="flex flex-col items-center justify-center"
                        >
                            {!isLoading ? (
                                data?.items.map((item) => (
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-700 delay-300"
                                        enterFrom="opacity-0 scale-75"
                                        enterTo="opacity-100 scale-100"
                                        key={item.guid}
                                    >
                                        <div
                                            onClick={() =>
                                                setModal(item.content)
                                            }
                                            className="relative mb-20 cursor-pointer max-md:mb-10 max-sm:mb-5"
                                        >
                                            <img
                                                className="h-128 w-256 rounded-lg object-cover max-md:h-96 max-sm:h-44"
                                                src={item.thumbnail}
                                                alt={item.title}
                                            />
                                            <span className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary-gray-dark bg-opacity-95 px-24 text-center text-2xl font-bold text-primary-white opacity-0 duration-300 hover:opacity-100">
                                                {item.title}
                                            </span>
                                        </div>
                                    </Transition.Child>
                                ))
                            ) : (
                                <Loading />
                            )}
                        </Transition>
                    </section>
                </>
            )}
        </main>
    );
}

'use client';

import {
    enhanceItemsThumbnail,
    getFirstItemParagraph,
} from '@/helpers/dataParser';
import { useEffectSafe } from '@/hooks/useEffectSafe';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import Loading from '@/components/loading';

export default function Blog() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffectSafe(() => {
        fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jacksonporciuncula'
        )
            .then((res) => res.json())
            .then((data) => {
                const enhancedItems = enhanceItemsThumbnail(data);
                const filteredItemsBasedOnCategory = enhancedItems.filter((e) =>
                    e.categories.includes('blog')
                );

                setData({ ...data, items: filteredItemsBasedOnCategory });
                setLoading(false);
            });
    }, []);

    return (
        <main className="container mx-auto my-20 max-sm:my-5">
            <Transition show appear className="mx-4 divide-y divide-[#F2F2F2]">
                {!isLoading ? (
                    data?.items.map((item) => (
                        <Transition.Child
                            key={item.guid}
                            as={Fragment}
                            enter="ease-out duration-700 delay-300"
                            enterFrom="opacity-0 scale-75"
                            enterTo="opacity-100 scale-100"
                        >
                            <Link href={item.link} target="_blank">
                                <div className="animate-fade delay-50 mx-12 grid max-h-48 min-h-48 grid-cols-4 place-content-center space-x-8 rounded-lg p-8 transition duration-150 hover:bg-primary-white max-md:mx-auto max-md:max-h-32 max-md:min-h-32 max-md:p-4">
                                    <div className="col-span-3 flex flex-col max-sm:col-span-4">
                                        <h2 className="line-clamp-2 text-ellipsis text-2xl font-bold text-primary-gray-darkest max-xl:text-xl max-sm:text-lg">
                                            {item.title}
                                        </h2>
                                        <p className="line-clamp-2 text-ellipsis text-primary-gray-darkest">
                                            {getFirstItemParagraph(
                                                item.description
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        {item.thumbnail && (
                                            <img
                                                className="h-full rounded-lg object-cover max-sm:hidden"
                                                src={item.thumbnail}
                                                alt={item.title}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </Transition.Child>
                    ))
                ) : (
                    <Loading />
                )}
            </Transition>
        </main>
    );
}

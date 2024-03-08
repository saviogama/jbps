'use client';

import { footerSections } from '@/constants/uiConstants';

export function Footer() {
    return (
        <footer className="flex w-full flex-col bg-primary-gray-darkest px-12 pb-6 pt-16 max-sm:px-6 max-sm:pt-6">
            <div className="mb-16 flex flex-row space-x-12 max-sm:mb-6 max-sm:space-x-6">
                {footerSections.map((section) => (
                    <div className="flex flex-col" key={section.sectionTitle}>
                        <h1 className="mb-2 font-bold text-secondary-gray-light">
                            {section.sectionTitle}
                        </h1>
                        {section.items.map((item) => {
                            return item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    className="animate-fade delay-50 text-sm text-primary-white transition duration-150 hover:text-secondary-gray-dark"
                                    key={item.text}
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <span
                                    className="text-sm text-primary-white"
                                    key={item.text}
                                >
                                    {item.text}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="flex flex-col border-t border-primary-white">
                <span className="mb-1 mt-4 text-sm text-primary-white max-sm:text-xs">
                    © 2024 Jackson Porciúncula. Todos os direitos reservados.
                </span>
                <span className="flex items-center text-xs text-primary-white max-sm:hidden">
                    Projetado por Jackson Porciúncula. Desenvolvido por{' '}
                    <a
                        className="animate-fade delay-50 ml-1 flex text-xs text-primary-white transition duration-150 hover:text-secondary-gray-dark"
                        href="https://www.linkedin.com/in/saviogama/"
                        target="_blank"
                    >
                        Sávio Gama
                    </a>{' '}
                    .
                </span>
                <div className="sm:hidden">
                    <span className="text-xs text-primary-white">
                        Projetado por Jackson Porciúncula.
                    </span>
                    <span className="flex items-center text-xs text-primary-white">
                        Desenvolvido por{' '}
                        <a
                            className="animate-fade delay-50 ml-1 flex text-xs text-primary-white transition duration-150 hover:text-secondary-gray-dark"
                            href="https://www.linkedin.com/in/saviogama/"
                            target="_blank"
                        >
                            Sávio Gama
                        </a>{' '}
                        .
                    </span>
                </div>
            </div>
        </footer>
    );
}

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.scss';

export function Modal({ children, close }) {
    return (
        <Transition
            as={Fragment}
            show
            appear
            enter="transition-opacity duration-1000 delay-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
        >
            <div>
                <button
                    type="button"
                    className="animate-fade delay-50 ml-12 mt-12 flex cursor-pointer items-center space-y-1 font-bold transition duration-150 hover:text-secondary-gray-dark"
                    onClick={close}
                >
                    <FiArrowLeft className="mr-1" />
                    Voltar
                </button>
                <div className="modal-container my-12 flex h-full w-full flex-col px-12 max-sm:px-4">
                    {children}
                </div>
            </div>
        </Transition>
    );
}

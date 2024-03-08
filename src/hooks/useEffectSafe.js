import { useEffect } from 'react';

/**
 * Prevents double call issue in development
 * @param {*} callback
 * @param {*} deps
 */
export const useEffectSafe = (callback, deps) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            callback();
        }, 200);
        return () => {
            clearTimeout(timeoutId);
        };
    }, deps);
};

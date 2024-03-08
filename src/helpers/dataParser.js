import {
    getFirstImgTagRegex,
    getFirstParagraphTagRegex,
} from '@/constants/regexConstants';

const tagStyles = {
    /* h1: 'leading-9 text-2xl font-bold text-gray-800',
    h2: 'leading-9 text-2xl font-bold text-gray-800',
    h3: 'leading-9 text-2xl font-bold text-gray-800',
    h4: 'leading-9 text-2xl font-bold text-gray-800',
    h5: 'leading-9 text-2xl font-bold text-gray-800',
    h6: 'leading-9 text-2xl font-bold text-gray-800',
    figure: 'mt-10 clear-both mr-auto ml-auto',
    p: 'leading-8 text-gray-800 break-words',
    strong: 'font-bold text-gray-800',
    a: 'underline',
    blockquote: '-ml-5 pl-6 shadow-sm',
    figcaption:
        'mt-2 mr-auto ml-auto text-center text-sm leading-5 text-gray-800 max-w-2xl',
    ul: 'p-0 ml-8',
    ol: 'p-0 ml-8',
    li: 'tracking-normal leading-6 text-gray-800', */
};

export const enhanceItemsThumbnail = (data) => {
    return data?.items.map((e) => {
        const match = e?.content.match(getFirstImgTagRegex);
        const src = match ? match[1] : null;

        return { ...e, thumbnail: src };
    });
};

export const getFirstItemParagraph = (content) => {
    const match = content.match(getFirstParagraphTagRegex);
    return match ? match[1] : null;
};

export const enhancedHtmlContent = (content) => {
    let isOpen = false;
    let tagName = '';

    const regex = /<\s*\/?\s*(\w+)[^>]*>/g;

    return content.replace(regex, (match, matchTagName) => {
        const enhancedClass = tagStyles[matchTagName.toLowerCase()];

        if (match.startsWith('</')) {
            isOpen = false;
            return match;
        } else if (match.startsWith('<')) {
            isOpen = true;
            tagName = matchTagName;
            if (enhancedClass) {
                return `<${matchTagName} class="${enhancedClass}">`;
            } else {
                return match;
            }
        } else {
            if (isOpen && enhancedClass) {
                return `<${tagName} class="${enhancedClass}">${match}`;
            } else {
                return match;
            }
        }
    });
};

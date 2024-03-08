/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '768px',
            md: '975px',
            lg: '986px',
            xl: '1439px',
        },
        colors: {
            primary: {
                gray: {
                    darkest: '#3B3C40',
                    dark: '#606873',
                    light: '#A1A2A6',
                },
                white: '#F2F2F2',
            },
            secondary: {
                gray: {
                    dark: '#AFAFAF',
                    light: '#D9D9D9',
                },
            },
        },
        fontFamily: {
            sans: ['var(--font-segoe-ui)'],
            serif: ['var(--font-segoe-ui)'],
        },
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem',
                256: '64rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};

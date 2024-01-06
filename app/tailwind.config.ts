//* https://github.com/praveenjuge/tailwindcss-brand-colors/blob/master/index.js

import kobalte from '@kobalte/tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'
import brandColors from 'tailwindcss-brand-colors'
import debugScreens from 'tailwindcss-debug-screens'
import type { Config } from 'tailwindcss'

const generateSizeClass = (upToSize: number, startAt = 80) => {
    const classes = {}
    for (let i = startAt; i < upToSize / 4; i += 4) {
        classes[i] = `${(i * 4) / 16}rem`
    }

    return classes
}

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']

// add class='dark' to <html> to enable dark mode - https://tailwindcss.com/docs/dark-mode

const config = {
    plugins: [kobalte, animate, forms, typography, daisyui, brandColors, debugScreens],
    darkMode: ['class', '[data-theme="dark"]' /* , '[data-kb-theme="dark"]' */],
    content: ['./src/**/*.{js,jsx,md,mdx,ts,tsx}'],
    purge: {
        //Because we made a dynamic class with the label we need to add those classes
        // to the safe list so the purge does not remove that
        safelist: [
            ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
            ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
            ...labelsClasses.map((lbl) => `text-${lbl}-400`),
        ],
    },
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        debugScreens: {
            position: ['bottom', 'left'],
        },
        screens: {
            xxs: '300px',
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {
            width: generateSizeClass(1024),
            minHeight: generateSizeClass(1024, 0),
            maxHeight: generateSizeClass(1024, 0),
            maxWidth: generateSizeClass(1024, 0),
            minWidth: generateSizeClass(1024, 0),
            borderWidth: {
                1: '1px',
            },
            gridTemplateColumns: {
                '1/5': '1fr 5fr',
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--kb-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--kb-accordion-content-height)' },
                    to: { height: '0' },
                },
                'content-show': {
                    from: { opacity: '0', transform: 'scale(0.96)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                'content-hide': {
                    from: { opacity: '1', transform: 'scale(1)' },
                    to: { opacity: '0', transform: 'scale(0.96)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'content-show': 'content-show 0.2s ease-out',
                'content-hide': 'content-hide 0.2s ease-out',
            },
        },
    },
    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'dark', // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ':root', // The element that receives theme color CSS variables
    },
} satisfies Config

export default config

//* https://github.com/praveenjuge/tailwindcss-brand-colors/blob/master/index.js

import kobalte from '@kobalte/tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'
import brandColors from 'tailwindcss-brand-colors'
import debugScreens from 'tailwindcss-debug-screens'
import uiPreset from './ui.preset'
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
    plugins: [
        animate,
        kobalte({ prefix: 'kb' }),
        forms,
        typography,
        daisyui,
        brandColors,
        debugScreens,
        uiPreset,
    ],
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
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
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            gridTemplateColumns: {
                '1/5': '1fr 5fr',
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

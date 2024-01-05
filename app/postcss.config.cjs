// eslint-disable-next-line no-undef
module.exports = {
    purge: {
        options: {
            safelist: [/data-theme$/, './index.html', './src/**/*.{js,ts,jsx,tsx}'],
        },
    },
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
    },
}

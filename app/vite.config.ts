import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
    optimizeDeps: {
        extensions: ['jsx', 'tsx'],
        esbuildOptions: {
            target: 'esnext',
        },
    },
    resolve: {
        alias: {
            '@interfaces': resolve(__dirname, './src/interfaces'),
            '@components': resolve(__dirname, './src/components'),
            '@routes': resolve(__dirname, './src/routes'),
            '@pages': resolve(__dirname, './src/pages'),
            '@styles': resolve(__dirname, './src/styles'),
            '@config': resolve(__dirname, './src/config'),
            '@src': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './assets'),
            '@hooks': resolve(__dirname, './src/utils/hooks'),
            '@store': resolve(__dirname, './src/store'),
            '@context': resolve(__dirname, './src/context'),
            '@static': resolve(__dirname, './src/static'),
            '@utils': resolve(__dirname, './src/utils'),
        },
    },
    plugins: [
        solidPlugin({
            babel: {
                plugins: ['babel-plugin-macros'],
            },
        }),
    ],
    server: {
        host: true,
        port: 5478,
        strictPort: true,
    },
    build: {
        target: 'esnext',
    },
})

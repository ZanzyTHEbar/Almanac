import { resolve } from 'path'
import { type ConfigEnv, type UserConfig, defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

async function getTauriConfig(configEnv: ConfigEnv) {
    const config: UserConfig = {
        clearScreen: false,
        envPrefix: ['VITE_', 'TAURI_'],
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
            watch: {
                // 3. tell vite to ignore watching `src-tauri`
                ignored: ['**/src-tauri/**'],
            },
        },
        build: {
            target: 'esnext',
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    //docs: resolve(__dirname, 'src/windows/docs/index.html'),
                    //webserial: resolve(__dirname, 'src/windows/webserial/index.html'),
                },
            },
            minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
            // produce sourcemaps for debug builds
            sourcemap: !!process.env.TAURI_DEBUG,
        },
    }
    return config
}

export default defineConfig(getTauriConfig)

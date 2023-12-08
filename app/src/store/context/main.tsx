import { exit } from '@tauri-apps/api/process'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useEventListener } from 'solidjs-use'
import { attachConsole, debug } from 'tauri-plugin-log-api'
import type { Context } from '@static/types'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { usePersistentStore } from '@src/store/tauriStore'
import { ExitCodes } from '@static/types/enums'
import { setFrontendReady } from 'tauri-plugin-splashscreen'

interface AppContextMain {
    getDetachConsole: Accessor<Promise<UnlistenFn>>
    loggedIn: Accessor<boolean>
    handleAppBoot: () => void
    handleTitlebar: (main?: boolean) => void
    setLoggedIn: (state: boolean) => void
}

const AppContextMain = createContext<AppContextMain>()
export const AppContextMainProvider: Component<Context> = (props) => {
    const detachConsole = attachConsole()
    const getDetachConsole = createMemo(() => detachConsole)

    const defaultState = {
        loggedIn: false,
    }

    const [state, setState] = createStore(defaultState)

    //#region Global Hooks
    const handleAppExit = async (main = false) => {
        // TODO: call these before the app exits to shutdown gracefully

        await invoke('handle_save_window_state')
        console.log('[App Close]: saved window state')

        if (main) {
            const { save } = usePersistentStore()
            await save()

            // saveSettings()

            await exit(ExitCodes.USER_EXIT)
        }
        // TODO: call REST api to stop the backend
        console.log('[App Exit]: Starting Python Backend')
        await appWindow.close()
    }

    const handleAppBoot = () => {
        console.log('[App Boot]: Frontend Initialization Starting')
        useEventListener(document, 'DOMContentLoaded', () => {
            // check if the window state is saved and restore it if it is
            invoke('handle_save_window_state').then(() => {
                console.log('[App Boot]: saved window state')
            })

            setTimeout(() => {
                setFrontendReady()
                    .then(() => {
                        debug('[App Boot]: Frontend Initialized')
                        console.log('[App Boot]: Frontend Initialized')
                    })
                    .catch((e) => console.error(e))
            }, 9000)
        })

        //TODO: Start mdns and websocket clients only after the backend is ready
        // TODO: call REST api to start the backend
        console.log('[App Boot]: Starting Python Backend')
    }

    const handleTitlebar = (main = false) => {
        const titlebar = document.getElementsByClassName('titlebar')
        if (titlebar) {
            useEventListener(document.getElementById('titlebar-minimize'), 'click', () => {
                appWindow.minimize()
            })
            useEventListener(document.getElementById('titlebar-maximize'), 'click', () => {
                appWindow.toggleMaximize()
            })
            useEventListener(document.getElementById('titlebar-close'), 'click', async () => {
                await handleAppExit(main)
            })
        }
    }
    //#endregion

    //#region Global State
    const setLoggedIn = (state: boolean) => {
        setState(
            produce((s) => {
                s.loggedIn = state
            }),
        )
    }

    //#endregion

    const GlobalState = createMemo(() => state)

    const loggedIn = createMemo(() => GlobalState().loggedIn)

    return (
        <AppContextMain.Provider
            value={{
                getDetachConsole,
                loggedIn,
                handleAppBoot,
                handleTitlebar,
                setLoggedIn,
            }}>
            {props.children}
        </AppContextMain.Provider>
    )
}

export const useAppContextMain = () => {
    const context = useContext(AppContextMain)
    if (context === undefined) {
        throw new Error('useAppContextMain must be used within a AppContextMainProvider')
    }
    return context
}

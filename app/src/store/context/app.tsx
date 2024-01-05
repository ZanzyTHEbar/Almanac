import {
    createContext,
    useContext,
    createMemo,
    type ParentComponent,
    type Accessor,
    onMount,
    createEffect,
    createSignal,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useEventListener, useInterval } from 'solidjs-use'
import { attachConsole, debug } from 'tauri-plugin-log-api'
import type { AppStore, DebugMode, PersistentSettings } from '@static/types'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { ENotificationAction } from '@static/enums'
import { useAppNotificationsContext } from '@store/context/notifications'
import { AppUIProvider } from '@store/context/ui'
import { usePersistentStore } from '@store/tauriStore'
//import { isEmpty } from '@utils/index'

interface AppContext {
    getDetachConsole: Accessor<Promise<UnlistenFn>>
    getDebugMode: Accessor<DebugMode>
    setDebugMode: (mode: DebugMode | undefined) => void
}

const AppContext = createContext<AppContext>()
export const AppProvider: ParentComponent = (props) => {
    const detachConsole = attachConsole()

    //#region Store
    const defaultState: AppStore = {
        debugMode: 'off',
    }

    const [state, setState] = createStore<AppStore>(defaultState)

    const setDebugMode = (mode: DebugMode | undefined) => {
        setState(
            produce((s) => {
                s.debugMode = mode || 'info'
            }),
        )
    }

    const appState = createMemo(() => state)
    const getDebugMode = createMemo(() => appState().debugMode)

    const getDetachConsole = createMemo(() => detachConsole)
    //#endregion

    //#region App Boot
    const [userIsInSettings, setUserIsInSettings] = createSignal(false)
    const { get, set } = usePersistentStore()

    const {
        setEnableNotifications,
        setEnableNotificationsSounds,
        setGlobalNotificationsType,
        getEnableNotificationsSounds,
        getEnableNotifications,
        getGlobalNotificationsType,
        checkPermission,
        addNotification,
    } = useAppNotificationsContext()

    onMount(() => {
        //* load the app settings from the persistent store and assign to the global state
        get('settings').then((settings) => {
            if (settings) {
                debug('loading settings')
                setEnableNotifications(settings.enableNotifications)
                setEnableNotificationsSounds(settings.enableNotificationsSounds)
                setGlobalNotificationsType(
                    settings.globalNotificationsType ?? ENotificationAction.APP,
                )

                setDebugMode(settings.debugMode)
            }
        })
        //* Check notification permissions
        checkPermission()
    })

    const createSettingsObject = () => {
        const settings: PersistentSettings = {
            enableNotifications: getEnableNotifications(),
            enableNotificationsSounds: getEnableNotificationsSounds(),
            globalNotificationsType: getGlobalNotificationsType(),
            debugMode: getDebugMode(),
        }
        return settings
    }

    const handleSaveSettings = () => {
        // check if the settings have changed and save to the store if they have
        //get('settings').then((storedSettings) => {
        //    if (!isEqual(storedSettings, createSettingsObject())) {
        //        debug(`[Routes]: Saving Settings - ${JSON.stringify(createSettingsObject())}`)
        //        set('settings', createSettingsObject())
        //    }
        //})
    }

    createEffect(() => {
        const { resume, pause } = useInterval(30000, {
            controls: true,
            callback: handleSaveSettings,
        })

        useEventListener(window, 'blur', () => {
            pause()
            debug(`[Routes]: Saving Settings - ${JSON.stringify(createSettingsObject())}`)
            set('settings', createSettingsObject())
            resume()
        })
    })
    //#endregion

    return (
        <AppContext.Provider
            value={{
                getDetachConsole,
                getDebugMode,
                setDebugMode,
            }}>
            <AppUIProvider>{props.children}</AppUIProvider>
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}

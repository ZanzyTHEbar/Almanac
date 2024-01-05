import { useLocation, useNavigate } from '@solidjs/router'
import { appDataDir } from '@tauri-apps/api/path'
import {
    lazy,
    onMount,
    Suspense,
    createEffect,
    type Component,
    createSignal,
    JSXElement,
} from 'solid-js'
import { useEventListener, useInterval } from 'solidjs-use'
import { debug, error } from 'tauri-plugin-log-api'
import type { BackendConfig, PersistentSettings } from '@static/types'
import { ENotificationAction, ENotificationType } from '@static/types/enums'
import { useAppContext } from '@store/context/app'
import { useAppContextMain } from '@store/context/main'
import { useAppNotificationsContext } from '@store/context/notifications'
import { useAppUIContext } from '@store/context/ui'
import { usePersistentStore } from '@store/tauriStore'
import { isEmpty } from '@utils/index'
import GlobalStyles from '@styles/globalstyles'

const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

// TODO: Add Crop button in header
// TODO: Settings button in header
// TODO: Edit button to change the garden calendar name

const App: Component<{
    children?: JSXElement
}> = (props) => {
    const [userIsInSettings, setUserIsInSettings] = createSignal(false)
    const params = useLocation()
    const { get, set } = usePersistentStore()
    const navigate = useNavigate()

    const { setDebugMode, getDebugMode } = useAppContext()
    const { handleTitlebar, handleAppBoot } = useAppContextMain()
    //const ref = document.getElementById('titlebar')

    onMount(() => {
        handleTitlebar(true)
        handleAppBoot()
        //startAuth().then((res) => {
        //    console.log(res)
        //})

        appDataDir().then((res) => {
            console.log(res)
        })
    })

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

    createEffect(() => {
        setUserIsInSettings(params.pathname.match('settings') !== null)
    })

    return (
        <main class="w-screen h-screen">
            <GlobalStyles />
            <div class="App overflow-y-auto items-center">
                <Suspense>
                    {props.children}
                    <ToastNotificationWindow />
                </Suspense>
            </div>
        </main>
    )
}

export default App

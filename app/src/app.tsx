import { useLocation } from '@solidjs/router'
import { appDataDir } from '@tauri-apps/api/path'
import { ParentComponent, lazy, onMount, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'
import SideBarMenu from '@components/Menu'
import { useAppContextMain } from '@store/context/main'
//import GlobalStyles from '@styles/globalstyles'

// TODO: Add ability to have more than one calendar
// TODO: Add algorithm to detect winter days based on location and timezone

const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

const App: ParentComponent = (props) => {
    const { handleTitlebar, handleAppBoot } = useAppContextMain()
    //const ref = document.getElementById('titlebar')
    const path = useLocation()

    onMount(() => {
        handleTitlebar(true)
        handleAppBoot()

        appDataDir().then((res) => {
            console.log(res)
        })
    })

    return (
        <main class="w-screen h-screen">
            <div class="overflow-hidden">
                <Transition
                    mode="outin"
                    onBeforeEnter={(el) => {
                        if (el instanceof HTMLElement) el.style.opacity = '0'
                    }}
                    onEnter={(el, done) => {
                        el.animate(
                            [
                                { opacity: 0, transform: 'translate(100px)' },
                                { opacity: 1, transform: 'translate(0)' },
                            ],
                            { duration: 600, fill: 'both' },
                        )
                            .finished.then(done)
                            .catch(done)
                    }}
                    onExit={(el, done) => {
                        el.animate(
                            [
                                { opacity: 1, transform: 'translate(0)' },
                                { opacity: 0, transform: 'translate(-100px)' },
                            ],
                            { duration: 600 },
                        )
                            .finished.then(done)
                            .catch(done)
                    }}>
                    {props.children}
                </Transition>
                <Show when={path.pathname !== '/'}>
                    <SideBarMenu />
                </Show>
                <ToastNotificationWindow />
            </div>
        </main>
    )
}

export default App

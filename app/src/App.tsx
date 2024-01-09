import { appDataDir } from '@tauri-apps/api/path'
import { ParentComponent, Suspense, lazy, onMount } from 'solid-js'
import { useAppContextMain } from '@store/context/main'
//import GlobalStyles from '@styles/globalstyles'

// TODO: Add ability to have more than one calendar
// TODO: Add algorithm to detect winter days based on location and timezone

const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

const App: ParentComponent = (props) => {
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

    return (
        <main class="w-screen h-screen">
            {/* <GlobalStyles /> */}
            <div class="overflow-hidden">
                <Suspense>
                    {props.children}
                    <ToastNotificationWindow />
                </Suspense>
            </div>
        </main>
    )
}

export default App

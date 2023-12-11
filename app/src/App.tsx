import { appDataDir } from '@tauri-apps/api/path'
import { lazy, onMount, Suspense } from 'solid-js'
import { useAppContextMain } from './store/context/main'
import { AppProvider } from '@src/store/context/app'

const AppRoutes = lazy(() => import('@routes/routes'))
const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

// TODO: Add Crop button in header
// TODO: Settings button in header
// TODO: Edit button to change the garden calendar name

const App = () => {
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
        <div class="App overflow-y-auto items-center">
            <Suspense>
                <AppProvider>
                    <AppRoutes />
                    <ToastNotificationWindow />
                </AppProvider>
            </Suspense>
        </div>
    )
}

export default App

/* import {
    ColorModeProvider,
    ColorModeScript,
    createCookieStorageManager,
    createLocalStorageManager,
} from '@kobalte/core' */
import { render } from 'solid-js/web'
import AppRoutes from '@routes/routes'
import { AppContextMainProvider } from '@store/context/main'
import '@styles/imports.css'

//const storageManager = createCookieStorageManager('colorMode', document.cookie)
//const storageManager = createLocalStorageManager('colorMode')

render(
    () => (
        <>
            <AppContextMainProvider>
                <AppRoutes />
            </AppContextMainProvider>
            {/* <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}></ColorModeProvider> */}
        </>
    ),
    document.getElementById('root') as HTMLElement,
)

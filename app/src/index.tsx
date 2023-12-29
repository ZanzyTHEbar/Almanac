import { render } from 'solid-js/web'
import AppRoutes from '@routes/routes'
import { AppContextMainProvider } from '@store/context/main'
import '@styles/imports.css'

render(
    () => (
        <AppContextMainProvider>
            <AppRoutes />
        </AppContextMainProvider>
    ),
    document.getElementById('root') as HTMLElement,
)

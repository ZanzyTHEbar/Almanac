import { Router, Route } from '@solidjs/router'
import { For } from 'solid-js'
import { routes } from '.'
import App from '@src/app'

const AppRoutes = () => {
    return (
        <Router root={App}>
            <For each={routes}>
                {(route) => <Route path={route.path} component={route.component} />}
            </For>
        </Router>
    )
}

export default AppRoutes

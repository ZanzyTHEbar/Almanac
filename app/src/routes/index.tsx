import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'
import { capitalizeFirstLetter } from '@src/lib/utils'

const Main = lazy(() => import('@pages/home'))
const Welcome = lazy(() => import('@pages/welcome'))
const Journal = lazy(() => import('@pages/journal'))
const Tasks = lazy(() => import('@pages/tasks'))
const AIChat = lazy(() => import('@pages/aichat'))
const AppSettings = lazy(() => import('@pages/settings'))
//const Settings = lazy(() => import('@pages/Settings'))
//const AppSettings = lazy(() => import('@pages/AppSettings'))
const page404 = lazy(() => import('@pages/page404'))

export const routes: RouteDefinition[] = [
    { path: '/', component: Welcome },
    { path: '/calendar', component: Main },
    { path: '/journal', component: Journal },
    { path: '/tasks', component: Tasks },
    { path: '/aichat', component: AIChat },
    { path: '/settings', component: AppSettings },
    //{ path: '/settings/:flag', component: Settings },
    { path: '*404', component: page404 },
]

const getRoutes = () => routes.filter((route) => route.path !== '*404' && route.path !== '/')
export const createRoutes = () => {
    return getRoutes().map((route) => {
        const label = capitalizeFirstLetter(route.path.replace('/', ''))

        return {
            label: label,
            path: route.path,
        }
    })
}

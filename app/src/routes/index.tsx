import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'

const Main = lazy(() => import('@pages/main'))
const Welcome = lazy(() => import('@pages/welcome'))
//const Settings = lazy(() => import('@pages/Settings'))
//const AppSettings = lazy(() => import('@pages/AppSettings'))
const page404 = lazy(() => import('@pages/page404'))

export const routes: RouteDefinition[] = [
    { path: '/', component: Welcome },
    { path: '/home', component: Main },
    //{ path: '/appSettings', component: AppSettings },
    //{ path: '/settings/:flag', component: Settings },
    { path: '**', component: page404 },
]

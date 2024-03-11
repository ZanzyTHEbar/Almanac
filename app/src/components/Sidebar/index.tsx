import { ParentComponent, createSignal, Show, createEffect } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { CardContent } from '@components/ui/card'
import Resizer from '@components/ui/resize'
import { useAppUIContext } from '@src/store/context/ui'

// TODO: handle setting and getting the  width and height from local storage
// TODO: Add second sidebar that triggers on hover, can not be resized. Only on left-side of main sidebar

const Sidebar: ParentComponent<{
    class?: string
}> = (props) => {
    const [width, setWidth] = createSignal<number>(325)
    const [sidebarRef, setSidebarRef] = createSignal<HTMLDivElement | null>(null)
    const { showSidebar } = useAppUIContext()
    
    let resizer!: HTMLDivElement

    const changeWidth = (clientY: number, clientX: number) => {
        console.debug('[Resize]: ', clientY, clientX)
        if (clientY < 0 || clientX < 0) return
        if (clientY < 325) {
            setWidth(325)
            return
        }
        setWidth(clientY)
    }

    createEffect(() => {
        sidebarRef()?.style.setProperty('width', `${width()}px`)
    })

    return (
        <Transition mode="outin" name="slide-fade">
            <Show when={showSidebar()}>
                <div class="overflow-y-auto overflow-x-hidden relative flex flex-row mt-2 mb-2 mr-1 ml-1">
                    <aside ref={setSidebarRef} id="main_sidebar" class="sidebar">
                        <Resizer ref={resizer} side="right" onResize={changeWidth}>
                            <CardContent class="pt-2.5 items-center text-center">
                                {props.children}
                            </CardContent>
                        </Resizer>
                    </aside>
                </div>
            </Show>
        </Transition>
    )
}

export default Sidebar

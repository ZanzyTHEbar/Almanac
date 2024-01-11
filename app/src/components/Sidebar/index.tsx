import { ParentComponent, createSignal, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { CardContent } from '@components/ui/card'
import Resizer from '@components/ui/resize'
import { useAppUIContext } from '@src/store/context/ui'

// TODO: handle setting and getting the  width and height from local storage
// TODO: Add second sidebar that triggers on hover, can not be resized. Only on left-side of main sidebar

const Sidebar: ParentComponent<{
    class?: string
}> = (props) => {
    const { showSidebar } = useAppUIContext()

    //const [sidebar, setSidebar] = createSignal<HTMLDivElement | null>(null)
    const [width, setWidth] = createSignal<number>(325)
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

    return (
        <Transition
            mode="outin"
            name="slide-fade"
            /*  enterActiveClass="delay-100 transition ease-out duration-300"
            enterClass="transform -translate-x-full"
            enterToClass="transform translate-x-0"
            exitActiveClass="delay-100 transition ease-in duration-300"
            exitClass="transform -translate-x-full"
            exitToClass="transform translate-x-0" */
        >
            <Show when={showSidebar()}>
                <div class="overflow-y-auto overflow-x-hidden relative flex flex-row mt-2 mb-2 mr-1 ml-1">
                    <aside
                        style={{
                            width: `${width()}px`,
                        }}
                        class="sidebar">
                        <Resizer ref={resizer} side="right" onResize={changeWidth}>
                            <CardContent class="items-center text-center">
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

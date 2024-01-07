import { ParentComponent, createSignal } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import { Card, CardContent } from '@components/ui/card'
import Resizer from '@components/ui/resize'
import { useAppUIContext } from '@src/store/context/ui'
//import TabBar from '@components/TabBar'

const Sidebar: ParentComponent<{
    class?: string
}> = (props) => {
    const { showSidebar } = useAppUIContext()

    // TODO: handle setting and getting the  width and height from local storage
    // TODO: Animate hiding the sidebar

    const [sidebar, setSidebar] = createSignal<HTMLDivElement | null>(null)
    const [width, setWidth] = createSignal<number>(175)
    //const [height, setHeight] = createSignal<number>(225)
    let resizer!: HTMLDivElement

    const changeWidth = (clientY: number, clientX: number) => {
        console.debug('[Resize]: ', clientY, clientX)
        if (clientY < 0 || clientX < 0) return
        if (clientY < 175) {
            setWidth(175)
            return
        }
        setWidth(clientY)
    }

    return (
        <Transition show={showSidebar()} appear={true}>
            <TransitionChild
                enter="transition ease-in-out transform transition duration-400"
                enterFrom="translate-x-full"
                enterTo="-translate-x-0"
                leave="transition ease-in-out transform transition duration-400"
                leaveFrom="-translate-x-0"
                leaveTo="translate-x-full">
                <Card
                    style={{
                        width: `${width()}px`,
                    }}
                    class="overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                    <aside ref={setSidebar} class="sidebar">
                        <Resizer ref={resizer} side="right" onResize={changeWidth}>
                            <CardContent class="items-center text-center">
                                {props.children}
                            </CardContent>
                        </Resizer>
                    </aside>
                </Card>
            </TransitionChild>
        </Transition>
    )
}

export default Sidebar

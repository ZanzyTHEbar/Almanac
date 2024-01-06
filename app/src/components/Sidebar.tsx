import { ParentComponent, createSignal, Component, Show } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import AddCrop from '@components/AddCropButton'
import AppCropModal from '@components/AddCropModal'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import GenericButton from '@components/GenericButton'
import Labels from '@components/Labels'
import { Card, CardContent } from '@components/ui/card'
import Resizer from '@components/ui/resize'
import { useAppUIContext } from '@src/store/context/ui'
//import TabBar from '@components/TabBar'

// TODO: Add search bar to filter crops

const BurgerMenu: Component<{
    class: string
}> = (props) => {
    const { showSidebar } = useAppUIContext()
    return (
        <div class={`${props.class} flex flex-1 mb-5`}>
            <Show when={showSidebar()}>
                <BurgerMenuIcon class={props.class} />
            </Show>
        </div>
    )
}

const Sidebar: ParentComponent<{
    class?: string
}> = (props) => {
    const { showSidebar, setShowSidebar } = useAppUIContext()

    // TODO: handle setting and getting the  width and height from local storage
    // TODO: Animate hiding the sidebar

    const [sidebar, setSidebar] = createSignal<HTMLDivElement | null>(null)
    const [width, setWidth] = createSignal<number>(300)
    //const [height, setHeight] = createSignal<number>(225)
    let resizer!: HTMLDivElement

    const changeWidth = (clientY: number, clientX: number) => {
        console.debug('[Resize]: ', clientY, clientX)
        if (clientY < 0 || clientX < 0) return
        if (clientY < 300) {
            setWidth(300)
            return
        }
        setWidth(clientY)
    }

    return (
        <Transition show={showSidebar()} appear={true}>
            <TransitionChild
                enter="transition ease-in-out transform transition duration-[400ms]"
                enterFrom="translate-x-0"
                enterTo="-translate-x-full"
                leave="transition ease-in-out transform transition duration-[400ms]"
                leaveFrom="-translate-x-full"
                leaveTo="translate-x-0">
                <Card
                    style={{
                        width: `${width()}px`,
                    }}
                    class="overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                    <aside ref={setSidebar} class="sidebar">
                        <Resizer ref={resizer} side="right" onResize={changeWidth}>
                            {/* <TabBar zone="left" /> */}
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

/* 
<aside class="h-full shadow-md border p-5 w-64 mr-4 rounded-[8px]  pt-[60px]">
    <div class="flex grow flex-1 flex-col justify-around">
        <GenericButton onClick={() => navigate('/')} content="Menu" />
        <div onClick={() => setShowSidebar(false)}>
            <BurgerMenu class="justify-end items-start" />
        </div>
        <div class="flex flex-col justify-center items-center content-center mt-3">
            <img src="images/veg.svg" alt="" />
            <Show when={true}>
                <p class="pt-2 text-gray-700 font-bold">No crops in your garden</p>
                <p class="text-gray-500">You haven't added any crops yet</p>
                <AppCropModal trigger={<AddCrop />} />
            </Show>
        </div>
        <div class="mt-3 p-2 flex flex-col grow justify-evenly shadow-sm border rounded-[8px]">
            <Labels />
        </div>
    </div>
</aside>




*/

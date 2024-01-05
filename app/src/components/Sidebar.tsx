import { ParentComponent, createSignal, Component, Show } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import AddCrop from '@components/AddCropButton'
import AppCropModal from '@components/AddCropModal'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import GenericButton from '@components/GenericButton'
import Labels from '@components/Labels'
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
                enterFrom="translate-x-full"
                enterTo="-translate-x-0"
                leave="transition ease-in-out transform transition duration-[400ms]"
                leaveFrom="-translate-x-0"
                leaveTo="translate-x-full">
                <div class="card h-auto pb-8 min-h-0">
                    <aside
                        ref={setSidebar}
                        class="sidebar bg-base-200 card m-2 block min-h-0 min-w-0 p-0 overflow-hidden bg-base-100/90 border-base-100 text-primary-content rounded-[8px] shadow-lg"
                        style={{
                            width: `${width()}px`,
                        }}>
                        <Resizer ref={resizer} side="right" onResize={changeWidth}>
                            {/* <TabBar zone="left" /> */}
                            {props.children}
                        </Resizer>
                    </aside>
                </div>
            </TransitionChild>
        </Transition>
    )
}

export default Sidebar

/* TODO: Animate Calendar Resize */
/* 
<aside class="h-full shadow-md border p-5 w-64 mr-4 rounded-[8px] transition-all duration-300 ease-in-out overflow-x-hidden pt-[60px]">
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

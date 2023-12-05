import { Component, Show } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import BurgerMenuIcon from './BurgerMenuIcon'
import CreateEventButton from '@components/CreateEventButton'
import Labels from '@components/Labels'
import { useAppUIContext } from '@src/store/context/ui'

const Sidebar: Component<{
    showSidebar: boolean
    class?: string
}> = (props) => {
    const { showSidebar } = useAppUIContext()
    return (
        <Transition show={props.showSidebar} appear={true}>
            {/* TODO: Animate Calendar Resize */}

            {/* Sliding sidebar */}
            <TransitionChild
                class="h-[97vh]"
                enter="transition ease-in-out transform transition duration-[400ms]"
                enterFrom="translate-x-full"
                enterTo="-translate-x-0"
                leave="transition ease-in-out transform transition duration-[400ms]"
                leaveFrom="-translate-x-0"
                leaveTo="translate-x-full">
                <aside class="h-full shadow-md border p-5 w-64 mr-4 rounded-[8px] transition-all duration-300 ease-in-out overflow-x-hidden pt-[60px]">
                    <div class="flex grow flex-1 flex-col justify-around">
                        <BurgerMenuIcon
                            class="justify-end items-start"
                            showSidebar={showSidebar()}
                        />
                        
                        {/* TODO: Add search bar to filter crops */}

                        <div class="flex flex-col justify-center items-center content-center mt-3">
                            <img src="images/veg.svg" alt="" />
                            <Show when={true}>
                                <p class="pt-2 text-gray-700 font-bold">No crops in your garden</p>
                                <p class="text-gray-500">You haven't added any crops yet</p>
                                <CreateEventButton />
                            </Show>
                        </div>
                        <div class="mt-3 p-2 flex flex-col grow justify-evenly shadow-sm border rounded-[8px]">
                            <Labels />
                        </div>
                    </div>
                </aside>
            </TransitionChild>
        </Transition>
    )
}

export default Sidebar

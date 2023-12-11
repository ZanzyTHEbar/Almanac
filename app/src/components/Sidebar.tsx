import { useNavigate } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import AddCrop from '@components/AddCrop'
import AppCropModal from '@components/AddCropModal'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import GenericButton from '@components/GenericButton'
import Labels from '@components/Labels'
import { useAppUIContext } from '@src/store/context/ui'

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

const Sidebar: Component<{
    class?: string
}> = (props) => {
    const { showSidebar, setShowSidebar } = useAppUIContext()

    const navigate = useNavigate()

    return (
        <Transition show={showSidebar()} appear={true}>
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
                        <GenericButton onClick={() => navigate('/')} content="Menu" />

                        <div onClick={() => setShowSidebar(false)}>
                            <BurgerMenu class="justify-end items-start" />
                        </div>

                        {/* TODO: Add search bar to filter crops */}

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
            </TransitionChild>
        </Transition>
    )
}

export default Sidebar

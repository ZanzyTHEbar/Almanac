import { Component, ComponentProps, Show, splitProps } from 'solid-js'
import AddCrop from '@components/AddCropButton'
import AppCropModal from '@components/AddCropModal'
import { BurgerMenu } from '@components/BurgerMenuIcon'
import GenericButton from '@components/GenericButton'
import Labels from '@components/Labels'
import { cn } from '@src/lib/utils'
import { useAppUIContext } from '@store/context/ui'

// TODO: Add search bar to filter crops

const SidebarContent: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    const { setShowSidebar } = useAppUIContext()
    return (
        <div class={cn(props.class)} {...rest}>
            <BurgerMenu
                onClick={() => setShowSidebar(false)}
                class="p-2 justify-end items-start"
            />
            <div class="flex flex-col justify-center items-center content-center mt-3">
                <img src="images/veg.svg" alt="" />
                {/* TODO: Check the crops store */}
                <Show when={true}>
                    <p class="pt-2 text-gray-700 font-bold">No crops in your garden</p>
                    <p class="text-gray-500">You haven't added any crops yet</p>
                    <AppCropModal>
                        <AddCrop />
                    </AppCropModal>
                </Show>
            </div>
            <div class="mt-3 p-2 flex flex-col grow justify-evenly shadow-sm border rounded-[8px]">
                <Labels />
            </div>
        </div>
    )
}

export default SidebarContent

import { Component, ComponentProps, Show, splitProps } from 'solid-js'
import AddCrop from '@components/AddCropButton'
import AppCropModal from '@components/AddCropModal'
import { BurgerMenu } from '@components/BurgerMenuIcon'
import Labels from '@components/Labels'
import { Label } from '@components/ui/label'
import { cn } from '@src/lib/utils'
import { useAppUIContext } from '@store/context/ui'

// TODO: Add search bar to filter crops

const SidebarContent: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    const { setShowSidebar } = useAppUIContext()
    return (
        <div class={cn('', props.class)} {...rest}>
            <BurgerMenu onClick={() => setShowSidebar(false)} class="p-2 justify-end items-start" />
            <div class="flex flex-col justify-center items-center content-center mt-3">
                <img class="mask mask-squircle bg-accent/75 p-3" src="images/veg.svg" alt="" />

                {/* TODO: Check the crops store */}
                <Show when={true}>
                    <Label weight="bold" size="lg" class="pt-2 text-gray-700">
                        No crops in your garden
                    </Label>
                    <Label class="text-gray-500" size="sm">
                        You haven't added any crops yet
                    </Label>
                    <AppCropModal>
                        <AddCrop />
                    </AppCropModal>
                </Show>
            </div>
            <div class="h-full p-2 flex flex-col grow justify-evenly">
                <Labels />
            </div>
        </div>
    )
}

export default SidebarContent

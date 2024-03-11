import { Component, ComponentProps, Show, splitProps } from 'solid-js'
import { BurgerMenu } from '@components/BurgerMenu'
import AppCropModal from '@components/Modal/AddCropModal'
import Crops from '@components/Sidebar/Content/Crops'
import { Label } from '@components/ui/label'
import { cn } from '@src/lib/utils'
import { useAppUIContext } from '@store/context/ui'

// TODO: Add search bar to filter crops
// TODO: Group by year planted
// TODO: Add feature to link multiple planting schedules together

const SidebarContent: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    const { setShowSidebar } = useAppUIContext()
    //const { getMonth } = useCalendarContext()
    return (
        <div class={cn('', props.class)} {...rest}>
            <div class="p-3">
                <BurgerMenu
                    onClick={() => setShowSidebar(false)}
                    class="justify-between items-start"
                />
            </div>
            <div class="flex flex-col justify-center items-center content-center mt-3">
                <img class="mask mask-squircle bg-accent/75 p-3" src="images/veg.svg" alt="" />

                {/* TODO: Check the crops store */}
                <Show when={true}>
                    <Label weight="bold" size="xl" class="pt-2 text-gray-700">
                        No crops in your garden
                    </Label>
                    <Label class="text-gray-500" size="lg">
                        You haven't added any crops yet
                    </Label>
                    <AppCropModal location='sidebar' />
                </Show>
            </div>
            <div class="h-full p-2 flex flex-col grow justify-evenly">
                <Crops />
            </div>
        </div>
    )
}

export default SidebarContent

import { type Component, Show } from 'solid-js'
import MenuSeparator from './MenuSeparator'
import { Flex } from '@components/ui/flex'
import { Label } from '@components/ui/label'

const MenuHeading: Component<{
    isHovered: boolean
    onClick: (e: PointerEvent) => void
}> = (props) => {
    const title = 'Almanac'.toUpperCase()
    return (
        <>
            <Flex
                onPointerDown={(e) => props.onClick(e)}
                class="w-full gap-2"
                flexDirection="row"
                alignItems="center"
                justifyContent="start">
                <img
                    src="images/logo.png"
                    class="cursor-pointer mask mask-circle w-12 h-12"
                    draggable={false}
                    alt="logo"
                />
                <Show when={props.isHovered}>
                    <Label
                        class="text-[#786658] hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out pt-2"
                        styles="pointer"
                        size="3xl"
                        weight="bold">
                        {title}
                    </Label>
                </Show>
            </Flex>
            <MenuSeparator isHovered={props.isHovered} />
        </>
    )
}

export default MenuHeading

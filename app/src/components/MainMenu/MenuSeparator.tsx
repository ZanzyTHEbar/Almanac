import type { Component } from 'solid-js'
import { Separator } from '@components/ui/separator'

const MenuSeparator: Component<{
    isHovered: boolean
}> = (props) => {
    return (
        <Separator
            class="w-[70%] opacity-20 transition-opacity duration-300 ease-in-out"
            classList={{
                'w-[70%]': !props.isHovered,
                'w-[95%]': props.isHovered,
            }}
            variant="accent"
        />
    )
}

export default MenuSeparator

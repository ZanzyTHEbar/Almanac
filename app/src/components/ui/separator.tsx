import { Separator as SeparatorPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'
import type { Component } from 'solid-js'

import { cn } from '@src/lib/utils'

const Separator: Component<SeparatorPrimitive.SeparatorRootProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'orientation', 'fullWidth'])
    return (
        <SeparatorPrimitive.Root
            orientation={props.orientation ?? 'horizontal'}
            class={cn(
                'border-accent/25  shrink-0 mx-4',
                props.orientation === 'vertical' ? 'h-full w-[1px]' : props.fullWidth ? 'h-[1px] w-full' : 'h-[1px]',
                props.class,
            )}
            {...rest}
        />
    )
}

export { Separator }

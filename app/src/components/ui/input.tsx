import { splitProps } from 'solid-js'
import { buttonVariants, type ButtonProps } from './button'
import type { Component, ComponentProps } from 'solid-js'
import { cn } from '@src/lib/utils'

const Input: Component<ComponentProps<'input'> & ButtonProps> = (props) => {
    const [, rest] = splitProps(props, ['type', 'class'])
    return (
        <input
            type={props.type}
            class={cn(
                buttonVariants({ variant: props.variant, size: props.size, styles: props.styles }),
                props.class,
            )}
            {...rest}
        />
    )
}

export { Input }

//import { Separator as SeparatorPrimitive } from '@kobalte/core'
import { cva } from 'class-variance-authority'
import { splitProps } from 'solid-js'
import type { VariantProps } from 'class-variance-authority'
import type { Component, ComponentProps } from 'solid-js'
import { cn } from '@src/lib/utils'

const separatorVariants = cva('divider', {
    variants: {
        variant: {
            default: '',
            neutral: 'divider-neutral',
            primary: 'divider-primary',
            secondary: 'divider-secondary',
            accent: 'divider-accent',
            success: 'divider-success',
            warning: 'divider-warning',
            info: 'divider-info',
            active: 'divider-active',
            error: 'divider-error',
        },
        styles: {
            default: '',
            start: 'divider-start',
            end: 'divider-end',
        },
        orientation: {
            default: 'divider-horizontal',
            vertical: 'divider-vertical',
        },
    },
    defaultVariants: {
        variant: 'default',
        styles: 'default',
    },
})

export interface SeparatorProps
    extends ComponentProps<'div'>,
        VariantProps<typeof separatorVariants> {}

const Separator: Component<SeparatorProps> = (props) => {
    const [, rest] = splitProps(props, ['styles', 'variant', 'class', 'orientation'])

    return (
        <div
            class={cn(
                separatorVariants({
                    variant: props.variant,
                    styles: props.styles,
                    orientation: props.orientation,
                }),
                props.class,
            )}
            {...rest}
        />
    )
}

export { Separator, separatorVariants }

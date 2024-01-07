import { cva } from 'class-variance-authority'
import { splitProps } from 'solid-js'
import type { VariantProps } from 'class-variance-authority'
import type { Component, ComponentProps } from 'solid-js'

import { cn } from '@src/lib/utils'

const labelVariants = cva(
    'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    {
        variants: {
            weight: {
                default: 'font-medium',
                bold: 'font-bold',
                light: 'font-light',
                extraLight: 'font-extralight',
                thin: 'font-thin',
                extraBold: 'font-extrabold',
                black: 'font-black',
                normal: 'font-normal',
                semiBold: 'font-semibold',
            },
            size: {
                default: '',
                xs: 'text-xs',
                sm: 'text-sm',
                base: 'text-base',
                lg: 'text-lg',
                xl: 'text-xl',
                '2xl': 'text-2xl',
                '3xl': 'text-3xl',
                '4xl': 'text-4xl',
            },
            styles: {
                default: 'not-italic',
                italic: 'italic',
            },
        },
        defaultVariants: {
            weight: 'default',
            size: 'default',
            styles: 'default',
        },
    },
)

export interface LabelProps extends ComponentProps<'label'>, VariantProps<typeof labelVariants> {}

const Label: Component<LabelProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'styles', 'weight', 'size'])
    return (
        <label
            class={cn(
                labelVariants({
                    weight: props.weight,
                    size: props.size,
                    styles: props.styles,
                }),
                props.class,
            )}
            {...rest}
        />
    )
}

export { Label }

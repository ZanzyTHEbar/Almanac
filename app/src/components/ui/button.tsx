import { cva } from 'class-variance-authority'
import { splitProps } from 'solid-js'
import type { VariantProps } from 'class-variance-authority'
import type { Component, ComponentProps } from 'solid-js'
import { cn } from '@src/lib/utils'

//ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
const buttonVariants = cva('', {
    variants: {
        variant: {
            default: 'btn',
            destructive: 'btn bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'btn btn-outline',
            disabled: 'btn btn-disabled',
            glass: 'btn glass',
            active: 'btn btn-active',
            primary: 'btn btn-primary',
            secondary: 'btn btn-secondary',
            ghost: 'btn btn-ghost',
            neutral: 'btn btn-neutral',
            accent: 'btn btn-accent',
            link: 'btn btn-link',
            success: 'btn btn-success',
            warning: 'btn btn-warning',
            info: 'btn btn-info',
            error: 'btn btn-error',
        },
        size: {
            default: '',
            lg: 'btn-lg',
            md: 'btn-md',
            sm: 'btn-sm',
            xs: 'btn-xs',
        },
        styles: {
            default: '',
            wide: 'btn-wide',
            block: 'btn-block',
            circle: 'btn-circle',
            square: 'btn-square',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        styles: 'default',
    },
})

export interface ButtonProps
    extends ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {}

const Button: Component<ButtonProps> = (props) => {
    const [, rest] = splitProps(props, ['variant', 'size', 'class'])
    return (
        <button
            class={cn(
                buttonVariants({ variant: props.variant, size: props.size, styles: props.styles }),
                props.class,
            )}
            {...rest}
        />
    )
}

export { Button, buttonVariants }

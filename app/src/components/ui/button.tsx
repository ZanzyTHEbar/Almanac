import { cva } from 'class-variance-authority'
import { splitProps } from 'solid-js'
import type { VariantProps } from 'class-variance-authority'
import type { Component, ComponentProps } from 'solid-js'
import { cn } from '@src/lib/utils'

//ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
const buttonVariants = cva('btn cursor-pointer', {
    variants: {
        variant: {
            default: '',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'btn-outline',
            disabled: 'btn-disabled',
            glass: 'glass',
            active: 'btn-active',
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            ghost: 'btn-ghost',
            neutral: 'btn-neutral',
            accent: 'btn-accent',
            link: 'btn-link',
            success: 'btn-success',
            warning: 'btn-warning',
            info: 'btn-info',
            error: 'btn-error',
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
    const [, rest] = splitProps(props, ['styles', 'variant', 'size', 'class'])
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

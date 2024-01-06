import { splitProps } from 'solid-js'
import type { Component, ComponentProps } from 'solid-js'

import { cn } from '@src/lib/utils'

const Card: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div
            class={cn(
                'card bg-secondary-300/95 rounded-box shadow-md',
                props.class,
            )}
            {...rest}
        />
    )
}

const CardHeader: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <div class={cn('flex flex-col space-y-1.5 p-6', props.class)} {...rest} />
}

const CardTitle: Component<ComponentProps<'h3'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <h3
            class={cn('card-title text-lg font-semibold leading-none tracking-tight', props.class)}
            {...rest}
        />
    )
}

const CardDescription: Component<ComponentProps<'p'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <p class={cn('card-body text-muted-foreground text-sm', props.class)} {...rest} />
}

const CardContent: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <div class={cn('', props.class)} {...rest} />
}

const CardFooter: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <div class={cn('card-actions flex items-center', props.class)} {...rest} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

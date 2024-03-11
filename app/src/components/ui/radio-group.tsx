import { RadioGroup as RadioGroupPrimitive } from '@kobalte/core'
import { TbCircle } from 'solid-icons/tb'
import { splitProps } from 'solid-js'
import type { Component } from 'solid-js'
import { cn } from '@src/lib/utils'

const RadioGroup: Component<RadioGroupPrimitive.RadioGroupRootProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <RadioGroupPrimitive.Root class={cn('grid gap-2', props.class)} {...rest} />
}

const RadioGroupItem: Component<RadioGroupPrimitive.RadioGroupItemProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'children'])
    return (
        <RadioGroupPrimitive.Item class={cn('flex items-center space-x-2', props.class)} {...rest}>
            <RadioGroupPrimitive.ItemInput />
            <RadioGroupPrimitive.ItemControl class="aspect-square size-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <RadioGroupPrimitive.ItemIndicator class="flex h-full items-center justify-center ">
                    <TbCircle class="size-2.5 fill-current text-current" />
                </RadioGroupPrimitive.ItemIndicator>
            </RadioGroupPrimitive.ItemControl>
            {props.children}
        </RadioGroupPrimitive.Item>
    )
}

const RadioGroupItemLabel: Component<RadioGroupPrimitive.RadioGroupItemLabelProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <RadioGroupPrimitive.ItemLabel
            class={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                props.class,
            )}
            {...rest}
        />
    )
}

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel }

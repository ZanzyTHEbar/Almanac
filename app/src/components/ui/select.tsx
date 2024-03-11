import { Select as SelectPrimitive } from '@kobalte/core'
import { TbCheck, TbChevronDown } from 'solid-icons/tb'
import { splitProps } from 'solid-js'
import type { Component } from 'solid-js'

import { cn } from '@src/lib/utils'

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectTrigger: Component<SelectPrimitive.SelectTriggerProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'children'])
    return (
        <SelectPrimitive.Trigger
            class={cn(
                'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex grow w-full h-10 items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                props.class,
            )}
            {...rest}>
            {props.children}
            <SelectPrimitive.Icon>
                <TbChevronDown class="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

const SelectContent: Component<SelectPrimitive.SelectContentProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                class={cn(
                    'text-pretty animate-in fade-in-80 relative z-10 min-w-[8rem] overflow-hidden rounded-md border-input shadow-lg',
                    props.class,
                )}
                {...rest}>
                <SelectPrimitive.Listbox class="m-0 p-1" />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
}

const SelectItem: Component<SelectPrimitive.SelectItemProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'children'])
    return (
        <SelectPrimitive.Item
            class={cn(
                'focus:bg-base-300 relative mt-0 flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                props.class,
            )}
            {...rest}>
            <span class="absolute left-2 flex h-4 w-4 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <TbCheck class="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemLabel>{props.children}</SelectPrimitive.ItemLabel>
        </SelectPrimitive.Item>
    )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }

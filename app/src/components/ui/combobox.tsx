import { Combobox as ComboboxPrimitive } from '@kobalte/core'
import { TbCheck, TbSelector } from 'solid-icons/tb'
import { type Component, splitProps } from 'solid-js'
import { cn } from '@src/lib/utils'

const Combobox = ComboboxPrimitive.Root

const ComboboxItem: Component<ComboboxPrimitive.ComboboxItemProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <ComboboxPrimitive.Item
            class={cn(
                'z-[60] data-[highlighted]:bg-accent/75 data-[highlighted]:text-accent-content relative flex flex-row cursor-default select-none items-center justify-between rounded-box px-2 py-1.5 mt-2 text-lg outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                props.class,
            )}
            {...rest}
        />
    )
}

const ComboboxItemLabel = ComboboxPrimitive.ItemLabel

const ComboboxItemIndicator: Component<ComboboxPrimitive.ComboboxItemIndicatorProps> = (props) => {
    const [, rest] = splitProps(props, ['children'])
    return (
        <ComboboxPrimitive.ItemIndicator {...rest}>
            {props.children ?? <TbCheck />}
        </ComboboxPrimitive.ItemIndicator>
    )
}

const ComboboxSection: Component<ComboboxPrimitive.ComboboxSectionProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <ComboboxPrimitive.Section
            class={cn(
                'z-[60] border border-t-0 border-l-0 border-r-0 border-b-accent/25 overflow-hidden p-1 px-2 py-1.5 pb-2 text-sm text-gray-400/75',
                props.class,
            )}
            {...rest}
        />
    )
}

// due to the generic typing this needs to be a function
function ComboboxControl<T>(props: ComboboxPrimitive.ComboboxControlProps<T>) {
    const [, rest] = splitProps(props, ['class'])
    return (
        <ComboboxPrimitive.Control
            role="combobox"
            tabIndex={0}
            class={cn(
                'outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-accent hover:ring-1 hover:ring-accent z-[60] dropdown dropdown-open flex items-center rounded-box border border-accent/25 px-3',
                props.class,
            )}
            {...rest}
        />
    )
}

const ComboboxInput: Component<ComboboxPrimitive.ComboboxInputProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <ComboboxPrimitive.Input
            class={cn(
                'z-[60] border-none focus:ring-0 enabled:border-none text-base-content flex h-10 w-full bg-transparent py-3 text-sm caret-accent outline-none focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                props.class,
            )}
            {...rest}
        />
    )
}

const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect

const ComboboxTrigger: Component<ComboboxPrimitive.ComboboxTriggerProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'children'])
    return (
        <ComboboxPrimitive.Trigger class={cn('h-4 w-4 opacity-50', props.class)} {...rest}>
            <ComboboxPrimitive.Icon>{props.children ?? <TbSelector />}</ComboboxPrimitive.Icon>
        </ComboboxPrimitive.Trigger>
    )
}

const ComboboxContent: Component<ComboboxPrimitive.ComboboxContentProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <ComboboxPrimitive.Portal>
            <ComboboxPrimitive.Content
                class={cn(
                    'z-[60] dropdown-content rounded-box p-2 shadow bg-base-100 animate-in fade-in-80 min-w-[8rem] overflow-hidden border border-accent/25',
                    props.class,
                )}
                {...rest}>
                <ComboboxPrimitive.Listbox class="m-0 p-1" />
            </ComboboxPrimitive.Content>
        </ComboboxPrimitive.Portal>
    )
}

export {
    Combobox,
    ComboboxItem,
    ComboboxItemLabel,
    ComboboxItemIndicator,
    ComboboxSection,
    ComboboxControl,
    ComboboxTrigger,
    ComboboxInput,
    ComboboxHiddenSelect,
    ComboboxContent,
}

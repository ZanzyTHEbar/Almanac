import { Tabs as TabsPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'
import type { Component } from 'solid-js'

import { cn } from '@src/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList: Component<TabsPrimitive.TabsListProps & { zone: string }> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <TabsPrimitive.List
            role="tablist"
            class={cn('tabs tabs-lifted space-x-2', props.class)}
            {...rest}
        />
    )
}

const TabsTrigger: Component<TabsPrimitive.TabsTriggerProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return <TabsPrimitive.Trigger class={cn('tab', props.class)} role="tab" {...rest} />
}

const TabsContent: Component<TabsPrimitive.TabsContentProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <TabsPrimitive.Content
            role="tabpanel"
            class={cn('border-base-300 rounded-box p-6', props.class)}
            {...rest}
        />
    )
}

const TabsIndicator: Component<TabsPrimitive.TabsIndicatorProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <TabsPrimitive.Indicator
            class={cn(
                'duration-250ms absolute transition-all data-[orientation=horizontal]:bottom-[-1px] data-[orientation=vertical]:right-[-1px] data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]',
                props.class,
            )}
            {...rest}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator }

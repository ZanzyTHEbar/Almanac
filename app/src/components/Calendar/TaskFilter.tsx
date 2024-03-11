import { For, JSXElement, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { type, Icons } from '../ui/icon'
import { Button } from '@components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'

import { Flex } from '@components/ui/flex'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from '@components/ui/radio-group'
import { Toggle } from '@components/ui/toggle'
import { CalendarEventTasks } from '@src/static/types'

// TODO: Implement the task filter object

/**
 * Task Filter
 * icon - filter - check box
 */
interface TaskFilterProps {
    filter: CalendarEventTasks
    /*  icon: JSXElement */
}

const tasks: TaskFilterProps[] = [
    {
        filter: 'Seeding',
        /*  icon: <Icons.Seeding />, */
    },
    {
        filter: 'Direct Seed',
        /*  icon: <Icons.DirectSeed />, */
    },
    {
        filter: 'Transplanting',
        /*  icon: <Icons.Transplanting />, */
    },
    {
        filter: 'Cultivating',
        /* icon: <Icons.Cultivating />, */
    },
    {
        filter: 'Harvesting',
        /* icon: <Icons.Harvesting />, */
    },
    {
        filter: 'Bed Preparation',
        /*   icon: <Icons.BedPreparation />, */
    },
]

const TaskFilter = () => {
    const handlePresentation = (filter: TaskFilterProps) => {
        return (
            <>
                <Flex flexDirection="row" justifyContent="start" alignItems="center" class="gap-2">
                    {/* {filter.icon} */}
                    <Label
                        for={`radio-${filter.filter}`}
                        size="lg"
                        weight="semiBold"
                        color="primary-500">
                        {filter.filter}
                    </Label>
                    <Toggle id={`radio-${filter.filter}`} name="task" value={filter.filter}>
                        {(state) => (
                            <Transition
                                mode="outin"
                                onBeforeEnter={(el) => {
                                    if (el instanceof HTMLElement) el.style.opacity = '0'
                                }}
                                onEnter={(el, done) => {
                                    el.animate(
                                        [
                                            {
                                                opacity: 0,
                                                transform: 'scale(0.9)',
                                            },
                                            { opacity: 1, transform: 'scale(1)' },
                                        ],
                                        { duration: 600, fill: 'both' },
                                    )
                                        .finished.then(done)
                                        .catch(done)
                                }}
                                onExit={(el, done) => {
                                    el.animate(
                                        [
                                            { opacity: 1, transform: 'scale(1)' },
                                            {
                                                opacity: 0,
                                                transform: 'scale(0.9)',
                                            },
                                        ],
                                        { duration: 600 },
                                    )
                                        .finished.then(done)
                                        .catch(done)
                                }}>
                                <Show when={state.pressed()} fallback={<Icons.circle size={12} />}>
                                    <Icons.check size={12} />
                                </Show>
                            </Transition>
                        )}
                    </Toggle>
                </Flex>
            </>
        )
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Label class="cursor-pointer" size="lg" weight="semiBold" color="primary-500">
                        Task Filter
                    </Label>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <For each={tasks}>
                        {(filter) => (
                            <DropdownMenuLabel>
                                {handlePresentation(filter)}

                                <DropdownMenuSeparator />
                            </DropdownMenuLabel>
                        )}
                    </For>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default TaskFilter

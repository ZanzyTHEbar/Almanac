import { type Component, Show, Switch, Match } from 'solid-js'
import { handleClass } from './utils'
import { Button } from '@components/ui/button'
import { Flex } from '@components/ui/flex'
import { Icons } from '@components/ui/icon'
import { Label, LabelSize } from '@components/ui/label'

const MenuItem: Component<{
    isHovered: boolean
    label: string
    labelSize?: LabelSize
    noIcon?: boolean
    onClick: (e: PointerEvent) => void
}> = (props) => {
    const color = '#7b716a'

    const Icon = () => {
        const options = {
            color: color,
            size: 30,
            class: 'text-center justify-start content-center items-center',
        }

        return (
            <Switch>
                <Match when={props.label === 'Calendar'}>
                    <Icons.calendar {...options} />
                </Match>
                <Match when={props.label === 'Journal'}>
                    <Icons.journal {...options} />
                </Match>
                <Match when={props.label === 'Tasks'}>
                    <Icons.tasks {...options} />
                </Match>
                <Match when={props.label === 'Aichat'}>
                    <Icons.chat {...options} />
                </Match>
                <Match when={props.label === 'Settings'}>
                    <Icons.gear {...options} />
                </Match>
                <Match when={props.label === 'Help Docs'}>
                    <Icons.question {...options} />
                </Match>
                <Match when={props.label === 'Profile'}>
                    <Icons.profile {...options} />
                </Match>
            </Switch>
        )
    }

    return (
        <div class="pt-2">
            <Switch>
                <Match when={props.noIcon}>
                    <Show when={!props.isHovered}>
                        <Label
                            class={`${handleClass()} text-center content-center`}
                            styles="pointer"
                            size={props.labelSize ? props.labelSize : '2xl'}>
                            {props.label}
                        </Label>
                    </Show>
                </Match>
                <Match when={!props.noIcon}>
                    <Button
                        class={`${handleClass()} pl-2 pr-2 w-[200px] text-pretty hover:bg-base-200`}
                        size="default"
                        variant="ghost"
                        styles="square"
                        onPointerDown={(e) => props.onClick(e)}>
                        <Flex
                            class="w-full gap-4"
                            flexDirection="row"
                            alignItems="stretch"
                            justifyContent="start">
                            <Icon />
                            <Show when={props.isHovered}>
                                <Label
                                    class={handleClass()}
                                    styles="pointer"
                                    size={props.labelSize ? props.labelSize : '2xl'}
                                    weight="bold">
                                    {props.label}
                                </Label>
                            </Show>
                        </Flex>
                    </Button>
                </Match>
            </Switch>
        </div>
    )
}

export default MenuItem

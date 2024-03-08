import { throttle } from '@solid-primitives/scheduled'
import { useNavigate } from '@solidjs/router'
import { type Component, createSignal, Show, For, Switch, Match } from 'solid-js'
import { Button } from '@components/ui/button'
import { CardContent } from '@components/ui/card'
import { Flex } from '@components/ui/flex'
import { Icons } from '@components/ui/icon'
import { Label, LabelSize } from '@components/ui/label'
import { createRoutes } from '@routes/index'

// TODO: Create a onHover menu that lists the pages in vertical order.
// The menu has this structure:
// - logo and name
// - horizontal line
// - calendar selection dropdown
// - menu items
// - horizontal line
// - help docs
// - my profile

const OnHoverContentHandler: Component<{
    isHovered: boolean
    label: string
    labelClass?: string
    labelSize?: LabelSize
    onClick: (e: any) => void
}> = (props) => {
    const color = '#7b716a'

    const handleLabelClass = () => {
        const constant = 'hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'
        return props.labelClass !== undefined
            ? `${props.labelClass} ${constant}`
            : `${constant} text-[#615b56] text-pretty hover:text-[${color}] hover:bg-base-200`
    }

    const Icon = () => {
        const options = {
            color: color,
            size: 30,
            class: 'text-center justify-start content-center items-center',
        }

        return (
            <Switch
                fallback={
                    <img
                        src="images/logo.png"
                        class={`${options.class} mask mask-circle w-12 h-12`}
                        alt="logo"
                    />
                }>
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
            </Switch>
        )
    }

    return (
        <div class="pt-2">
            <Button
                class={`${handleLabelClass()} pl-2 pr-2 w-[200px] text-pretty hover:bg-base-200`}
                size="default"
                variant="ghost"
                styles="square"
                onClick={(e) => props.onClick(e)}>
                <Flex
                    class="w-full gap-2"
                    flexDirection="row"
                    alignItems="stretch"
                    justifyContent="start">
                    <Icon />
                    <Show when={props.isHovered}>
                        <Label
                            class={handleLabelClass()}
                            styles="pointer"
                            size={props.labelSize ? props.labelSize : '3xl'}
                            weight="bold">
                            {props.label}
                        </Label>
                    </Show>
                </Flex>
            </Button>
        </div>
    )
}

const SideBarMenu: Component = () => {
    const title = 'Almanac'.toUpperCase()
    const [isHovered, setIsHovered] = createSignal(false)
    const navigate = useNavigate()

    const handleHover = (hover: boolean) => {
        setIsHovered(hover)
        console.log('hovered', isHovered())
    }

    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-50 transition-all duration-500"
            classList={{ 'w-[90px]': !isHovered(), 'w-[225px]': isHovered() }}
            onPointerEnter={() => throttle(handleHover, 300)(true)}
            onPointerLeave={() => throttle(handleHover, 300)(false)}>
            <div class="w-full overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="w-full navbar items-center text-center">
                    <Flex
                        class="gap-6"
                        alignItems="baseline"
                        justifyContent="center"
                        flexDirection="col">
                        {/* Logo */}
                        <OnHoverContentHandler
                            labelClass="text-[#786658]"
                            label={title}
                            isHovered={isHovered()}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/')
                            }}
                        />
                        {/* Separator */}

                        {/* Menu Items */}
                        <For each={createRoutes()}>
                            {(item, index) => (
                                <OnHoverContentHandler
                                    label={item.label}
                                    data-index={index()}
                                    isHovered={isHovered()}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(item.path)
                                    }}
                                />
                            )}
                        </For>
                        {/* Separator */}

                        {/* How-to docs */}
                        
                        {/* your profile */}
                    </Flex>
                </CardContent>
            </div>
        </aside>
    )
}

export default SideBarMenu

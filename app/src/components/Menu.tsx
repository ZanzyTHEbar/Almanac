import { throttle } from '@solid-primitives/scheduled'
import { useNavigate } from '@solidjs/router'
import { type Component, createSignal, Show, For, Switch, Match, JSXElement } from 'solid-js'
import { Separator } from './ui/separator'
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

const color = '#7b716a'

const handleClass = () => {
    const constant = 'hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'
    return `${constant} text-[#615b56] text-pretty hover:text-[${color}] hover:bg-base-200`
}

const MenuItem: Component<{
    isHovered: boolean
    label: string
    labelSize?: LabelSize
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
        </div>
    )
}

const MenuSeparator: Component<{
    isHovered: boolean
}> = (props) => {
    return (
        <Separator
            classList={{
                'w-[70%] opacity-20': !props.isHovered,
                'w-[95%] opacity-20': props.isHovered,
            }}
            variant="accent"
        />
    )
}

const MenuHeading: Component<{
    isHovered: boolean
    onClick: (e: PointerEvent) => void
}> = (props) => {
    const title = 'Almanac'.toUpperCase()
    return (
        <>
            <Flex
                onPointerDown={(e) => props.onClick(e)}
                class="w-full gap-2"
                flexDirection="row"
                alignItems="center"
                justifyContent="start">
                <img
                    src="images/logo.png"
                    class="cursor-pointer mask mask-circle w-12 h-12"
                    draggable={false}
                    alt="logo"
                />
                <Show when={props.isHovered}>
                    <Label
                        class="text-[#786658] hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out pt-2"
                        styles="pointer"
                        size="3xl"
                        weight="bold">
                        {title}
                    </Label>
                </Show>
            </Flex>
            <MenuSeparator isHovered={props.isHovered} />
        </>
    )
}

const MainMenuContent: Component<{
    isHovered: boolean
    navigate: (path: string) => void
}> = (props) => {
    return (
        <Flex
            class="flex-grow gap-6"
            alignItems="baseline"
            justifyContent="start"
            flexDirection="col">
            <MenuHeading
                isHovered={props.isHovered}
                onClick={(e) => {
                    e.preventDefault()
                    props.navigate('/')
                }}
            />

            {/* Menu Items */}
            <For each={createRoutes()}>
                {(item, index) => (
                    <MenuItem
                        label={item.label}
                        data-index={index()}
                        isHovered={props.isHovered}
                        labelSize="2xl"
                        onClick={(e) => {
                            e.preventDefault()
                            props.navigate(item.path)
                        }}
                    />
                )}
            </For>
        </Flex>
    )
}

const FooterContent: Component<{
    isHovered: boolean
    navigate: (path: string) => void
}> = (props) => {
    return (
        <>
            <MenuSeparator isHovered={props.isHovered} />
            <Flex class="gap-2 pb-4" alignItems="baseline" justifyContent="center" flexDirection="col">
                <MenuItem
                    label="Help Docs"
                    isHovered={props.isHovered}
                    labelSize="2xl"
                    onClick={(e) => {
                        e.preventDefault()
                        // TODO: Open the help docs
                    }}
                />
                <MenuItem
                    label="Profile"
                    isHovered={props.isHovered}
                    labelSize="2xl"
                    onClick={(e) => {
                        e.preventDefault()
                        props.navigate('/profile')
                    }}
                />
            </Flex>
        </>
    )
}

const SideBarMenu: Component = () => {
    const [isHovered, setIsHovered] = createSignal(false)
    const navigate = useNavigate()

    const handleHover = (hover: boolean) => {
        setIsHovered(hover)
        console.debug('SideBarMenu: Hovered -', isHovered())
    }

    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-50 transition-all duration-500"
            classList={{ 'w-[90px]': !isHovered(), 'w-[225px]': isHovered() }}
            onPointerEnter={() => throttle(handleHover, 200)(true)}
            onPointerLeave={() => throttle(handleHover, 200)(false)}>
            <div class="w-full h-full overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="w-full h-full navbar-start items-center text-center pb-4 pr-2 pl-2 pt-2">
                    <Flex
                        class="w-full h-full gap-6"
                        alignItems="baseline"
                        justifyContent="start"
                        flexDirection="col">
                        <MainMenuContent isHovered={isHovered()} navigate={navigate} />
                        <FooterContent isHovered={isHovered()} navigate={navigate} />
                    </Flex>
                </CardContent>
            </div>
        </aside>
    )
}

export default SideBarMenu

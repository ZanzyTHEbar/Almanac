import { debounce } from '@solid-primitives/scheduled'
import { useNavigate } from '@solidjs/router'
import {
    type Component,
    createSignal,
    Show,
    For,
    Switch,
    Match,
    createEffect,
    onMount,
    onCleanup,
} from 'solid-js'
import { Separator } from './ui/separator'
import { Button } from '@components/ui/button'
import { CardContent } from '@components/ui/card'
import { Flex } from '@components/ui/flex'
import { Icons } from '@components/ui/icon'
import { Label, LabelSize } from '@components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select'
import { createRoutes } from '@routes/index'
import { useCalendarContext } from '@store/context/calendar'

const color = '#7b716a'

const handleClass = () => {
    const constant = 'hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'
    return `${constant} text-[#615b56] text-pretty hover:text-[${color}] hover:bg-base-200`
}

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

const MenuSeparator: Component<{
    isHovered: boolean
}> = (props) => {
    return (
        <Separator
            class="w-[70%] opacity-20 transition-opacity duration-300 ease-in-out"
            classList={{
                'w-[70%]': !props.isHovered,
                'w-[95%]': props.isHovered,
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
    onHover: (hover: boolean) => void
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
            <CalendarSelector onHover={props.onHover} isHovered={props.isHovered} />

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
            <Flex
                class="gap-2 pb-4"
                alignItems="baseline"
                justifyContent="center"
                flexDirection="col">
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

const CalendarSelector: Component<{
    isHovered: boolean
    onHover: (hover: boolean) => void
}> = (props) => {
    const { calendars, setSelectedCalendar, selectedCalendar } = useCalendarContext()
    const [firstLetter, setFirstLetter] = createSignal<string>('')
    const [isSelecting, setIsSelecting] = createSignal(false)
    const [calendarDropDown, setCalendarDropDown] = createSignal('')

    const handleSelectCalendar = () => {
        if (!calendarDropDown()) {
            console.warn('CalendarSelector: Calendar not selected')
            return
        }

        const findCalendar = calendars().find((calendar) => calendar.name === calendarDropDown())

        if (!findCalendar) {
            console.error('CalendarSelector: Calendar not found')
            return
        }

        setFirstLetter(findCalendar.name.charAt(0).toUpperCase())
        setSelectedCalendar(findCalendar)

        console.debug('CalendarSelector: Selected Calendar -', selectedCalendar())
    }

    const handlePlaceholder = () => {
        return (
            <Label class={handleClass()} styles="pointer" size="2xl" weight="bold">
                {selectedCalendar()?.name}
            </Label>
        )
    }

    onMount(() => {
        if (!selectedCalendar()) return

        const firstLetter = selectedCalendar()!.name.charAt(0).toUpperCase()
        setFirstLetter(firstLetter)
    })

    createEffect(() => {
        handleSelectCalendar()
        if (props.isHovered) setIsSelecting(true)
        if (!props.isHovered) setIsSelecting(false)
    })

    return (
        <Flex flexDirection="col">
            <Show
                when={isSelecting()}
                fallback={
                    <div class="bg-secondary-300/95 border border-accent/25 w-[50px] shadow-none rounded-md mr-6">
                        <MenuItem
                            label={firstLetter()}
                            noIcon={true}
                            labelSize="3xl"
                            isHovered={props.isHovered}
                            onClick={(e) => {
                                e.preventDefault()
                            }}
                        />
                    </div>
                }>
                <Select
                    value={calendarDropDown()}
                    onChange={(e) => {
                        setCalendarDropDown(e)
                        debounce(props.onHover, 200)(false)
                        debounce(setIsSelecting, 200)(false)
                    }}
                    defaultValue={selectedCalendar()?.name}
                    options={[...calendars().map((calendar) => calendar.name)]}
                    placeholder={handlePlaceholder()}
                    itemComponent={(props) => (
                        <SelectItem class="z-[60]" item={props.item}>
                            {props.item.rawValue}
                        </SelectItem>
                    )}>
                    <SelectTrigger
                        aria-label="calendars"
                        class="border-none focus:ring-0 enabled:border-none">
                        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent
                        onPointerEnter={() => props.onHover(true)}
                        onPointerLeave={() => props.onHover(false)}
                        class="bg-base-100/75 hover:bg-base-200 overflow-y-scroll h-[400px]"
                    />
                </Select>
            </Show>
        </Flex>
    )
}

const SideBarMenu: Component = () => {
    const [isHovered, setIsHovered] = createSignal(false)
    const [selectMenuActive, setSelectMenuActive] = createSignal(false)

    const navigate = useNavigate()

    let hoverTimer: NodeJS.Timeout

    const handleHover = (hover: boolean) => {
        clearTimeout(hoverTimer) // Clear any existing timer
        console.debug('SelectMenuActive: Hovered -', selectMenuActive())

        hoverTimer = setTimeout(() => {
            if (selectMenuActive()) return
            if (isHovered() === hover) return
            setIsHovered(hover)
            console.debug('SideBarMenu: Hovered -', isHovered())
        }, 200)
    }

    const toggleSelectMenuActive = (active: boolean) => {
        setSelectMenuActive(active)
    }

    onCleanup(() => clearTimeout(hoverTimer))

    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-9 transition-all duration-500"
            classList={{ 'w-[90px]': !isHovered(), 'w-[225px]': isHovered() }}
            onPointerEnter={() => debounce(handleHover, 200)(true)}
            onPointerLeave={() => debounce(handleHover, 200)(false)}>
            <div class="w-full h-full overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="w-full h-full navbar-start items-center text-center pb-4 pr-2 pl-2 pt-2">
                    <Flex
                        class="w-full h-full gap-6"
                        alignItems="baseline"
                        justifyContent="start"
                        flexDirection="col">
                        <MainMenuContent
                            onHover={toggleSelectMenuActive}
                            isHovered={isHovered()}
                            navigate={navigate}
                        />
                        <FooterContent isHovered={isHovered()} navigate={navigate} />
                    </Flex>
                </CardContent>
            </div>
        </aside>
    )
}

export default SideBarMenu

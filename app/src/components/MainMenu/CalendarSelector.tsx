import { debounce } from '@solid-primitives/scheduled'
import { Show, createEffect, createSignal, onMount, type Component } from 'solid-js'
import MenuItem from './MenuItem'
import { handleClass } from './utils'
import { Flex } from '@components/ui/flex'
import { Label } from '@components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select'
import { useCalendarContext } from '@store/context/calendar'

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

export default CalendarSelector

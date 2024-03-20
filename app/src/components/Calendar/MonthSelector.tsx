import dayjs from 'dayjs'
import { createEffect, createSignal, type Component } from 'solid-js'
import { handleClass } from '@components/MainMenu/utils'
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

const MonthSelector: Component = () => {
    const { getMonth, selectedCalendar, setCurrentMonthIndex } = useCalendarContext()
    const [monthDropDown, setMonthDropDown] = createSignal('')
    const [currentMonth, setCurrentMonth] = createSignal<dayjs.Dayjs>()

    const handleSelectMonth = () => {
        if (!selectedCalendar()) return

        const selectedMonthDayjs = dayjs(monthDropDown(), 'MMMM YYYY')
        // Assuming getMonth() requires a month and year argument
        const monthMatrix = getMonth(selectedMonthDayjs.month())

        // You might need to adjust this logic based on how you intend to use `findIndex`
        // This is a placeholder as the original intent wasn't fully clear
        const idx = monthMatrix.findIndex((week) =>
            week.some(
                (day) =>
                    day.month() === selectedMonthDayjs.month() &&
                    day.year() === selectedMonthDayjs.year(),
            ),
        )
        // Assuming you're doing something with idx after this

        setCurrentMonthIndex(idx)
    }

    const handlePlaceholder = () => {
        // grab the current month and year from the currentMonth signal

        return (
            <Label class={handleClass()} styles="pointer" size="2xl" weight="bold">
                {currentMonth()?.format('MMMM YYYY')}
            </Label>
        )
    }

    const selectOptions = (): string[] => {
        // generate an array of month and year, one year back and one year forward from current year - from march to march
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const monthArray: string[] = []
        for (let i = 0; i < 12; i++) {
            monthArray.push(months[(month + i) % 12] + ' ' + (year + Math.floor((month + i) / 12)))
        }

        return monthArray
    }

    createEffect(() => {
        if (!selectedCalendar()) return
        setCurrentMonth(dayjs(new Date(dayjs().year(), selectedCalendar()!.currentMonthIdx)))
    })

    createEffect(() => {
        handleSelectMonth()
    })

    return (
        <Flex flexDirection="col">
            <div class="h-full">
                <Select
                    value={monthDropDown()}
                    onChange={setMonthDropDown}
                    defaultValue={selectedCalendar()?.name}
                    options={[...selectOptions().map((month) => month)]}
                    placeholder={handlePlaceholder()}
                    itemComponent={(props) => (
                        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}>
                    <SelectTrigger
                        aria-label="month selector"
                        class="gap-2 border-none focus:ring-0 enabled:border-none">
                        <SelectValue<string>>
                            {(state) => (
                                <Label
                                    class={handleClass()}
                                    styles="pointer"
                                    size="2xl"
                                    weight="bold">
                                    {state.selectedOption()}
                                </Label>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent class="bg-base-100/75 hover:bg-base-200 overflow-y-scroll h-[400px]" />
                </Select>
            </div>
        </Flex>
    )
}

export default MonthSelector

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
    const { getMonth, selectedCalendar } = useCalendarContext()
    const [monthDropDown, setMonthDropDown] = createSignal('')

    const handleSelectMonth = () => {}

    const handlePlaceholder = () => {
        const dates = getMonth().map((month) =>
            month[selectedCalendar()!.currentMonthIdx].format('MMMM YYYY'),
        )

        // grab the current month and year from the dates
        const date = dates[selectedCalendar()!.currentMonthIdx + 1]

        return (
            <Label class={handleClass()} styles="pointer" size="2xl" weight="bold">
                {date}
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

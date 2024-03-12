import { For, type Component, createSignal, onMount } from 'solid-js'
import Day, { dayjs } from '@components/Calendar/Day'

// TODO: Implement timeline and year calendars
// TOdO: Implement printable and pdf export of calendar
// TODO: Implement ical and other format exports of calendar

export interface MonthProps {
    month: dayjs.Dayjs[][]
}

const MonthCalendarHandler: Component<MonthProps> = (props) => {
    // check the number of days in the month and create a new array with the correct number of days
    const [days, setDays] = createSignal<dayjs.Dayjs[]>()

    const handleDay = () => {
        props.month.map((row) =>
            row.map((day) => {
                //* check if it's the end of the month and if so clear extra days
                if (day.date() === day.daysInMonth()) {
                    console.debug('Last day of the month')
                    setDays([...row.slice(0, day.date())])
                }
            }),
        )
    }

    onMount(() => {
        handleDay()
    })

    return (
        <For each={props.month}>
            {(row, index) => (
                <For data-index={index()} each={row}>
                    {(day, j) => <Day data-index={j()} day={day} rowIdx={index()} />}
                </For>
            )}
        </For>
    )
}

export default MonthCalendarHandler

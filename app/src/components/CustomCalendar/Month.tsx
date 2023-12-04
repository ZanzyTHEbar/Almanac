import { For, type Component, createSignal, onMount } from 'solid-js'
import Day, { dayjs } from '@components/CustomCalendar/Day'

export interface MonthProps {
    month: dayjs.Dayjs[][]
}

const HandleDay: Component<MonthProps> = (props) => {
    // check the number of days in the month and create a new array with the correct number of days
    const [days, setDays] = createSignal<dayjs.Dayjs[]>()

    const handleDay = () => {
        props.month.map((row) =>
            row.map((day) => {
                //check if it's the end of the month and if so clear extra days
                if (day.date() === day.daysInMonth()) {
                    console.log('Last day of the month')
                    setDays([...row.slice(0, day.date())])
                }
            }),
        )
    }

    onMount(() => {
        handleDay()
        console.log('[Days]: ', days())
    })

    return (
        <For each={props.month}>
            {(row, i) => (
                <For data-index={i()} each={row}>
                    {(day, j) => <Day data-index={j()} day={day} rowIdx={i()} />}
                </For>
            )}
        </For>
    )
}

const Month: Component<MonthProps> = (props) => {
    // filter out any month over the current month (to prevent future dates from being selected)

    return (
        <div class="p-3 gap-[3px] flex-1 grid grid-cols-7 grid-rows-6 rounded-[8px]">
            <HandleDay month={props.month} />
        </div>
    )
}

export default Month

import { For, type Component, createSignal, onMount } from 'solid-js'
import Day, { dayjs } from '@components/Day'
import { Card } from '@components/ui/card'
import { Grid } from '@components/ui/grid'

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
                    console.debug('Last day of the month')
                    setDays([...row.slice(0, day.date())])
                }
            }),
        )
    }

    onMount(() => {
        handleDay()
        console.debug('[Days]: ', days())
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

const Month: Component<MonthProps> = (props) => {
    const cols = 7

    return (
        <Card class="w-full rounded-box overflow-x-hidden mt-2 mb-2 mr-2 ml-1">
            <Grid cols={cols} class="w-full h-full">
                <HandleDay month={props.month} />
            </Grid>
        </Card>
    )
}

export default Month

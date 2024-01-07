import { For, type Component, createSignal, onMount, Show, createEffect } from 'solid-js'
import { BurgerMenu } from '@components/BurgerMenuIcon'
import Day, { dayjs } from '@components/Day'
import { Card } from '@components/ui/card'
import { Grid } from '@components/ui/grid'
import { useAppUIContext } from '@src/store/context/ui'

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

    const { showSidebar, setShowSidebar } = useAppUIContext()

    createEffect(() => {
        console.debug('[Month]: ', props.month)
        console.debug('[Month]: ', showSidebar())
    })

    return (
        <Card class="w-full rounded-box overflow-x-hidden mt-2 mb-2 mr-2 ml-1">
            <Show when={!showSidebar()}>
                <BurgerMenu
                    onClick={() => setShowSidebar(true)}
                    class="p-2 justify-start items-start"
                />
            </Show>
            <Grid cols={cols} class="w-full h-full">
                <HandleDay month={props.month} />
            </Grid>
        </Card>
    )
}

export default Month

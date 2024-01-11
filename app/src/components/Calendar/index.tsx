import { type Component, Show } from 'solid-js'
import { BurgerMenu } from '@components/BurgerMenu'
import Calendar, { type MonthProps } from '@components/Calendar/CalendarHandler'
import CalendarHeader from '@components/Calendar/CalendarHeader'
import { Card } from '@components/ui/card'
import { Grid } from '@components/ui/grid'
import { useAppUIContext } from '@src/store/context/ui'

const Month: Component<MonthProps> = (props) => {
    const cols = 7

    const { showSidebar, setShowSidebar } = useAppUIContext()

    return (
        <Card
            
            class="flex-grow transform transition-transform delay-300 duration-400 w-full rounded-box overflow-x-hidden mt-2 mb-2 mr-2 ml-1">
            <Show when={!showSidebar()}>
                <BurgerMenu
                    onClick={() => setShowSidebar(true)}
                    class="p-2 justify-start items-start"
                />
            </Show>
            <CalendarHeader id="calendar" />
            <Grid cols={cols} class="w-full h-full">
                <Calendar month={props.month} />
            </Grid>
        </Card>
    )
}

export default Month

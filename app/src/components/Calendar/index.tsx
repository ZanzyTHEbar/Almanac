import { type Component, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'
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
            style={{
                transition: 'width 0.3s ease-in-out',
            }}
            class="flex-grow w-full rounded-box overflow-x-hidden mt-2 mb-2 mr-2 ml-1">
            <Transition name="burger-fade">
                <Show when={!showSidebar()}>
                    <BurgerMenu
                        onClick={() => setShowSidebar(true)}
                        class="p-2 justify-start items-start"
                    />
                </Show>
            </Transition>
            <CalendarHeader id="calendar" />
            <Grid cols={cols} class="w-full h-full">
                <Calendar month={props.month} />
            </Grid>
        </Card>
    )
}

export default Month
